import { Admins } from "../../models/Admin";
import { Controller } from "../../types/controller";
import JsonResponse from "../../utils/Response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ADMIN_SECRET } from "../../secret";

const expiresIn = 60*60*24*14*1000;
const options = {maxAge: expiresIn, httpOnly: false};

export const adminLogin: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { email, password } = req.body;
        if(!email) return jsonResponse.clientError("Please provide email");
        if(!password) return jsonResponse.clientError("Please provide password");
        const admin = await Admins.findOne({email});
        if(!admin) return jsonResponse.clientError("Acount not found");
        const password_matched = await bcrypt.compare(password, admin.password);
        if(!password_matched) return jsonResponse.clientError("Invalid password");
        
        //jwt
        const token = jwt.sign({user_id: admin.user_id}, ADMIN_SECRET, {expiresIn: "10d"});
        res.cookie("session", token, options);

        delete (admin as any).password;
        jsonResponse.success(admin, "Scucessfully logged in");
    } catch (error) {
        console.log(error)
        jsonResponse.serverError();
    }
}