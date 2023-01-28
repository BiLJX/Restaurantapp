import { Bill } from "@shared/Order";
import { SalesLog } from "../../models/SalesLog";
import { Server } from "socket.io";
import { makeId } from "../../utils/idgen";
import { Orders } from "../../models/Order";
import { Controller } from "../../types/controller";
import JsonResponse from "../../utils/Response";
import { OrderLog } from "../../models/OrderLogs";
import { OrderLogI } from "@shared/Sales";

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

export const billPaid: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { restaurant_id } = res.locals.employee;
    const io: Server = req.app.locals.io;
    try {
        const seat_id = req.params.seat_id;
        const orders = await Orders.find({seat_id, restaurant_id}).populate("food");

        const total_price = orders.reduce((total, order)=>total + (order.quantity * order.food.price), 0)

        await Orders.deleteMany({seat_id});
        io.to(restaurant_id).emit("order:paid", {seat_id});
        jsonResponse.success();
        //logs
        try {
            const order_log_data: OrderLogI[] = orders.map(x=>({
                restaurant_id,
                log_id: makeId(),
                createdAt: new Date(),
                food_id: x.food_id,
                amount: x.food.price
            }))
            const sales_log = new SalesLog({
                log_id: makeId(),
                restaurant_id,
                amount: total_price
            })
           
            await sales_log.save();
            await OrderLog.insertMany(order_log_data);
        } catch (error) {
            console.log(error)
        }
        
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}