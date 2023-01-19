import { Food } from "@shared/Menu";
import { Schema, model } from "mongoose";

const schema  = new Schema<Food>({
    food_id: {
        type: String,
        unique: true,
    },
    food_category_id: {
        required: true,
        type: String
    },
    restaurant_id: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true,
    }
});

const Foods = model("food", schema);

export { Foods };