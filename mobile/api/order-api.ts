import { Bill, OrderItem, OrderStatus } from "@shared/Order";
import axios from "./axios";

export const getOrders = async(data?: {status?:OrderStatus, seat_id?: string}) => {
    const res = await axios.get("/api/employee/orders", {params: data});
    return res.data as ApiResponse<OrderItem[]>
}

export const getBill = async(seat_id: string) => {
    const res = await axios.get("/api/employee/orders/bill/"+seat_id);
    return res.data as ApiResponse<Bill>;
}

export const payBill = async(seat_id: string) => {
    const res = await axios.put("/api/employee/orders/bill/paid/"+seat_id);
    return res.data as ApiResponse<Bill>;
}