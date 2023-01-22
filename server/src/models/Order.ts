import { Schema, model } from "mongoose";
import { OrderItem } from "@shared/Order";
const schema = new Schema<OrderItem>({  
    order_id: {
        type: String,
        required: true,
        unique: true
    },
    restaurant_id: {
        type: String,
        required: true,
    },
    seat_id: {
        type: String,
        required: true,
    },
    order_by: {
        type: String,
        required: true,
    },
    food_id: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Delivered","Ready","Cooking","Pending"],
        default: "Pending"
    }
}, {timestamps: true})

schema.virtual('food', {
    ref: "food",
    localField: "food_id",
    foreignField: "food_id",
    justOne: true
})

const Orders = model("order", schema);

export { Orders };