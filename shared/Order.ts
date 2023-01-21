import { Food } from "./Menu";

export interface FoodOrder {
    quantity: number,
    food_id: string
}

export interface TakeOrder {
    seat_id: string,
    foods: FoodOrder[],
}