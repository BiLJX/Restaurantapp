"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesLog = void 0;
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
    }
}, { timestamps: true });
exports.SalesLog = (0, mongoose_1.model)("sales_log", schema);
