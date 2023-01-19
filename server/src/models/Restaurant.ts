import { model, Schema } from "mongoose";
import {Restaurant} from "@shared/Restaurant";

const schema = new Schema<Restaurant>({
    name: {
        required: true,
        type: String
    },
    restaurant_id: {
        required: true,
        type: String,
        unique: true
    }
}, {timestamps: true})

const Restaurants = model("restaurant", schema);

export { Restaurants };