import { OrderItem, TakeorderClientData } from "@shared/Order";
import { Server, Socket } from "socket.io";
import { Orders } from "../models/Order";
import { makeId } from "../utils/idgen";

export default function orderHandler(socket: Socket, io: Server)
{

    const createOrder = async(order_client: TakeorderClientData) => {
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
                food: {} as any
            }
        })
        await Orders.insertMany(order_item);
        console.log(`${socket.restaurant_id}:Chef`)
        const orders = await Orders.find({order_id}).populate("food").exec();
        io.to(`${socket.restaurant_id}:Chef`).emit("order:new", orders);
    }

    
    socket.on("order:create", createOrder);

}