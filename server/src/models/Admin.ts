import { model, Schema } from "mongoose";
import { Admin } from "@shared/User";

const schema = new Schema<Admin>({
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
}, {timestamps: true});

const Admins = model("admin", schema);

export { Admins }