import { model, Schema } from "mongoose";
import { Seat } from "@shared/Seat";
const schema = new Schema<Seat>({
    seat_id: {
        type: String,
        unique: true,
    },
    seat_name: {
        type: String,
        required: true
    },
    restaurant_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

export const Seats = model("seat", schema);