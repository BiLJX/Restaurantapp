import { Food } from "./Menu";
export type OrderStatus = "Delivered"|"Ready"|"Cooking"|"Pending"


export interface Order {
    order_by: string,
    restaurant_id: string
    order_id: string,
    seat_id: string,
    foods: OrderItem[],
}

export interface OrderItem {
    order_item_id: string,
    order_id: string,
    order_by: string,
    restaurant_id: string,
    seat_id: string,
    quantity: number,
    food_id: string,
    seat_name: string
    status: OrderStatus,
    food: Food
}

export interface TakeOrderItem extends Food{
    quantity: number
}
export interface TakeorderClientData {
    seat_id: string,
    foods: TakeOrderItem[],
}


export interface Bill {
    total_price: number,
    orders: OrderItem[]
}