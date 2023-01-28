export interface SalesLogI {
    log_id: string,
    restaurant_id: string,
    amount: number,
    createdAt: Date,
}

export interface OrderLogI {
    log_id: string,
    restaurant_id: string,
    food_id: string,
    amount: number,
    createdAt: Date
}