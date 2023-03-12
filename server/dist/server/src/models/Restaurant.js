"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurants = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    name: {
        required: true,
        type: String
    },
    restaurant_id: {
        required: true,
        type: String,
        unique: true
    }
}, { timestamps: true });
var Restaurants = (0, mongoose_1.model)("restaurant", schema);
exports.Restaurants = Restaurants;
