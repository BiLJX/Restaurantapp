import { Food } from "./Menu";

export interface OrderItem {
    order_id: string,
    order_by: string,
    restaurant_id: string,
    seat_id: string,
    quantity: number,
    food_id: string,
    status: "Delivered"|"Ready"|"Cooking"|"Pending"
}

export interface Order {
    order_by: string,
    restaurant_id: string
    order_id: string,
    seat_id: string,
    foods: OrderItem[],
}