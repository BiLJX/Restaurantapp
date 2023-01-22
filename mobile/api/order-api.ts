import { OrderItem, OrderStatus } from "@shared/Order";
import axios from "./axios";

export const getOrders = async(data?: {status?:OrderStatus, seat_id?: string}) => {
    const res = await axios.get("/api/employee/orders", {params: data});
    return res.data as ApiResponse<OrderItem[]>
}