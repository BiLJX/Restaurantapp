import { OrderLogI } from "@shared/Sales";
import { model, Schema } from "mongoose";

const schema = new Schema<OrderLogI>({
    log_id: {
        required: true,
        unique: true,
        type: String,
    },
    restaurant_id: {
        required: true,
        type: String
    },
    amount: {
        required: true,
        type: Number
    },
    food_id: {
        required: true,
        type: String
    }
}, {timestamps: true});

export const OrderLog = model("order_log", schema);
