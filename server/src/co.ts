import mongoose from "mongoose"
import { Admins } from "./models/Admin";
import { Restaurants } from "./models/Restaurant";
import { makeId } from "./utils/idgen";
import bcrypt from "bcrypt";
const CONNECTION_URL = ""

async function _INIT_(){
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("4252760b", salt);
    const admin = new Admins({
        email: "billjeshbaidya@gmail.com",
        user_id: makeId(),
        restaurant_id: "33382e5131e13",
        contact_no: 9864534427,
        full_name: "Billjesh Man Baidya",
        gender: "Male",
        profile_pic_url: "",
        password 
    })
    admin.save();
    console.log("done")
}

mongoose.connect(CONNECTION_URL).then(_INIT_);
