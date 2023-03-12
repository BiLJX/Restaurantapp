"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderLog = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.OrderLog = (0, mongoose_1.model)("order_log", schema);
