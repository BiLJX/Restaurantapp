import { Restaurant } from "@shared/Restaurant";
import { OrderLogI, SalesLogI } from "@shared/Sales";
import { Employee } from "@shared/User";
import { Restaurants } from "../../models/Restaurant";
import JsonResponse from "../../utils/Response";
import { Controller } from "../../types/controller";
import { Dashboard } from "@shared/Dashboard"
import { getLastDays, getToday } from "../../utils/query";
import { SalesLog } from "../../models/SalesLog";
import { OrderLog } from "../../models/OrderLogs";
import moment from "moment"
export const retrieveDashboard: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { restaurant_id } = res.locals.admin;
    try {
        interface AggregatedData extends Restaurant{
            order_logs: {_id: string, count: number}[],
            sales_logs: {_id: null, total_sales: number, count: number},
            employees_count: number
        }
        const [data1] = await Restaurants.aggregate<AggregatedData>([
            {
                $match: {restaurant_id}
            },
            {
                $lookup: {
                    from: "order_logs",
                    as: "order_logs",
                    localField: "restaurant_id",
                    foreignField: "restaurant_id",
                    pipeline: [
                        {
                            $lookup: {
                                from: "foods",
                                as: "food",
                                localField: "food_id",
                                foreignField: "food_id"
                            }
                        },
                        {
                            $unwind: {
                                preserveNullAndEmptyArrays: true,
                                path: "$food"
                            }
                        },
                        {
                            $group: {
                                _id: "$food.name",
                                count: {$sum: 1}
                            }
                        },
                        {
                            $sort: {
                                count: -1
                            }
                        },
                        {
                            $limit: 3
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "sales_logs",
                    as: "sales_logs",
                    localField: "restaurant_id",
                    foreignField: "restaurant_id",
                    pipeline: [
                        {
                            $match: {
                                createdAt: getToday()
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                total_sales: {
                                    $sum: "$amount"
                                },
                                count: {$sum: 1}
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$sales_logs",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "employees",
                    as: "employees",
                    localField: "restaurant_id",
                    foreignField: "restaurant_id"
                }
            },
            {
                $addFields: {
                    employees_count: {$size: "$employees"}
                }
            }
        ])
        const revenue = await SalesLog.aggregate<{_id: {"day": number, "month": number}, total_sales: number}>([
            {
                $match: {
                    restaurant_id,
                    createdAt: getLastDays(14)
                }
            },
            {
                $group: {
                    _id: {
                        day: {$dayOfMonth: "$createdAt"},
                        month: {$month: "$createdAt"}
                    },
                    total_sales: {$sum: "$amount"}
                }
            }
        ])
        const orders = await OrderLog.aggregate<{_id: {"day": number, "month": number}, total_orders: number}>([
            {
                $match: {
                    restaurant_id,
                    createdAt: getLastDays(14)
                }
            },
            {
                $group: {
                    _id: {
                        day: {$dayOfMonth: "$createdAt"},
                        month: {$month: "$createdAt"}
                    },
                    total_orders: {$sum: 1}
                }
            }
        ])
        const data: Dashboard = {
            dash_board_overview: {
                total_employees_count: data1.employees_count || 0,
                total_orders_count: data1.sales_logs?.count || 0,
                total_revenue_count: data1.sales_logs?.total_sales || 0,
                total_revenue_month_count: data1.sales_logs?.total_sales || 0
            },
            orders: {
                data: orders.map(x=>x.total_orders),
                labels: orders.map(x=>`${moment(x._id.month.toString(), 'MM').format("MMM")} ${x._id.day}`),
                // data: [5, 8, 10, 8, 2, 4, 6, 7],
                // labels: ["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7", "Jan 8"]
            },
            revenue: {
                data: revenue.map(x=>x.total_sales),
                labels: orders.map(x=>`${moment(x._id.month.toString(), 'MM').format("MMM")} ${x._id.day}`),
                // data: [500, 844, 1022, 811, 200, 400, 600, 700],
                // labels: ["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7", "Jan 8"]
            },
            sales_by_food: {
                data: data1.order_logs.map(x=>x.count),
                labels: data1.order_logs.map(x=>x._id)
            }
        }
        jsonResponse.success(data)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}