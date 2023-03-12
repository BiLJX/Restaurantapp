"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    order_item_id: {
        type: String,
        required: true,
    },
    order_id: {
        type: String,
        required: true,
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
        enum: ["Delivered", "Ready", "Cooking", "Pending"],
        default: "Pending"
    }
}, { timestamps: true, toJSON: { virtuals: true, }, toObject: { virtuals: true, }, });
schema.virtual('food', {
    ref: "food",
    localField: "food_id",
    foreignField: "food_id",
    justOne: true
});
var Orders = (0, mongoose_1.model)("order", schema);
exports.Orders = Orders;
