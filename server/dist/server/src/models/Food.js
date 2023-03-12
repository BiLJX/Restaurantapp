"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foods = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
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
var Foods = (0, mongoose_1.model)("food", schema);
exports.Foods = Foods;
