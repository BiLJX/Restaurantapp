import { model, Schema } from "mongoose";
import { SalesLogI } from "@shared/Sales"
const schema = new Schema<SalesLogI>({
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
    }
}, {timestamps: true});

export const SalesLog = model("sales_log", schema);