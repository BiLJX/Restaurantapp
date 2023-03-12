"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seats = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.Seats = (0, mongoose_1.model)("seat", schema);
