import { OrderItem } from "@shared/Order";
import { Server, Socket } from "socket.io";

export default function orderHandler(socket: Socket, io: Server){
    const createOrder = (order_item: OrderItem) => {
        console.log(order_item)
    }
    socket.on("order:create", createOrder)
}