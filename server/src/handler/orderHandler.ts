import { OrderItem } from "@shared/Order";
import { Server, Socket } from "socket.io";
import { Orders } from "../models/Order";
import { makeId } from "../utils/idgen";

export default function orderHandler(socket: Socket, io: Server)
{

    const createOrder = async(order_item: OrderItem) => {
        const order = new Orders({
            order_id: makeId(),
            food_id: order_item.food_id,
            seat_id: order_item.seat_id,
            quantity: order_item.quantity,
            order_by: socket.user_id,
            restaurant_id: socket.restaurant_id,
        })
        await order.save();
        order.populate("food");
        socket.to(`${socket.restaurant_id}:Kitchen`).emit("order:new", order_item);
    }

    
    socket.on("order:create", createOrder);

}