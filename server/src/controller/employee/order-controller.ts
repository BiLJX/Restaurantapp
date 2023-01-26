import { Bill } from "@shared/Order";
import { Orders } from "../../models/Order";
import { Controller } from "../../types/controller";
import JsonResponse from "../../utils/Response";

export const retrieveOrders: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { status, seat_id } = req.query as {status: string, seat_id: string};
        const { restaurant_id } = res.locals.employee;
        const find = () => {
            if(status && seat_id) return {restaurant_id, status, seat_id};
            if(status) return {restaurant_id, status};
            if(seat_id) return {restaurant_id, seat_id}
            return {restaurant_id}
        }
        const orders = await Orders.aggregate([
            {
                $match: find()
            },
            {
                $lookup: {
                    as: "food",
                    from: "foods",
                    foreignField: "food_id",
                    localField: "food_id"
                }
            },
            {
                $lookup: {
                    as: "seat_data",
                    from: "seats",
                    foreignField: "seat_id",
                    localField: "seat_id"
                }
            },
            {
                $unwind: "$food"
            },
            {
                $unwind: "$seat_data"
            },
            {
                $addFields: {
                    seat_name: "$seat_data.seat_name"
                }
            },
            {
                $project: {
                    seat_data: 0
                }
            }
        ])
        jsonResponse.success(orders);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const retrieveBill: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { restaurant_id } = res.locals.employee;
    try {
        const seat_id = req.params.seat_id;
        const orders = await Orders.find({seat_id, restaurant_id}).populate("food");
        const bill: Bill = {
            total_price: orders.reduce((total, order)=>total + (order.quantity * order.food.price), 0),
            orders
        }
        jsonResponse.success(bill)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}