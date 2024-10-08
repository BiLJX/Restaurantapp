import { OrderItem, OrderStatus, TakeorderClientData } from "@shared/Order";
import { Server, Socket } from "socket.io";
import { Orders } from "../models/Order";
import { makeId } from "../utils/idgen";

export default function orderHandler(socket: Socket, io: Server)
{

    const createOrder = async(order_client: TakeorderClientData) => {
        try {
            const order_id = makeId()
            const order_item: OrderItem[] = order_client.foods.map(x=>{
                return {
                    order_item_id: makeId(),
                    order_id,
                    food_id: x.food_id,
                    seat_id: order_client.seat_id,
                    quantity: x.quantity,
                    order_by: socket.user_id,
                    restaurant_id: socket.restaurant_id,
                    status: "Pending",
                    seat_name: "",
                    food: {} as any
                }
            })
            await Orders.insertMany(order_item);
            console.log(`${socket.restaurant_id}:Chef`)
            const orders = await Orders.aggregate([
                {$match:{order_id}},
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
            io.to(`${socket.restaurant_id}:Chef`).emit("order:new", orders);
        } catch (error) {
            io.to(socket.user_id).emit("Error", {msg: "Error something went wrong :("});
        }
        
    }

    const deleteOrderItem = async({order_item_id}: {order_item_id: string}) => {
        try {
            await Orders.deleteOne({order_item_id});
            io.to(socket.restaurant_id).emit("order-item:cancel", {order_item_id})
        } catch (error) {
            io.to(socket.user_id).emit("Error", {msg: "Error something went wrong :("});
        }
    }

    const onStatusChange = async({status, order_item_id}: {status: OrderStatus, order_item_id: string}) => {
        try {
            await Orders.findOneAndUpdate({order_item_id}, {
                $set: {
                    status
                }
            })
            socket.broadcast.to(socket.restaurant_id).emit("order-item:status", {order_item_id, status})
        } catch (error) {
            io.to(socket.user_id).emit("Error", {msg: "Error something went wrong :("});
        }
    }

    const onPaid = async({seat_id}: {seat_id: string}) => {
        try {
            await Orders.deleteMany({seat_id});
            io.to(socket.restaurant_id).emit("order:paid", {seat_id})
        } catch (error) {
            io.to(socket.user_id).emit("Error", {msg: "Error something went wrong :("});
        }
    }

    socket.on("order-item:status", onStatusChange);
    socket.on("order:create", createOrder);
    socket.on("order-item:cancel", deleteOrderItem);
    socket.on("order:paid", onPaid);
}