"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admins = void 0;
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
    }
}, { timestamps: true });
var Admins = (0, mongoose_1.model)("admin", schema);
exports.Admins = Admins;
