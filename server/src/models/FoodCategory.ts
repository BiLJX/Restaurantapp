import { Schema, model } from "mongoose";
import { FoodCategory } from "@shared/Menu";

const schema = new Schema<FoodCategory>({
    food_category_id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    restaurant_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

const FoodCategories = model("food_category", schema);

export { FoodCategories };