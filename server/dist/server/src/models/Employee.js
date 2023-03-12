"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employees = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    user_id: {
        unique: true,
        required: true,
        type: String
    },
    email: {
        unique: true,
        required: true,
        type: String
    },
    full_name: {
        unique: true,
        required: true,
        type: String
    },
    contact_no: {
        unique: true,
        required: true,
        type: Number
    },
    password: {
        required: true,
        type: String
    },
    gender: {
        required: true,
        type: String,
        enum: ["Male", "Female"]
    },
    profile_pic_url: {
        required: false,
        type: String
    },
    restaurant_id: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String,
        enum: ["Chef", "Waiter", "Admin"]
    },
}, { timestamps: true });
var Employees = (0, mongoose_1.model)("employee", schema);
exports.Employees = Employees;
