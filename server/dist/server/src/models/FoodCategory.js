"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodCategories = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
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
}, { timestamps: true });
var FoodCategories = (0, mongoose_1.model)("food_category", schema);
exports.FoodCategories = FoodCategories;
