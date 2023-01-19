import { Admins } from "../models/Admin";
import { Controller } from "../types/controller";
import JsonResponse from "../utils/Response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ADMIN_SECRET, EMPLOYEE_SECRET } from "../secret";
import { Employees } from "../models/Employee";

const expiresIn = 60*60*24*14*1000;
const options = {maxAge: expiresIn, httpOnly: false};

export const adminLogin: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { email, password } = req.body;
        if(!email) return jsonResponse.clientError("Please provide email");
        if(!password) return jsonResponse.clientError("Please provide password");
        const admin = await Employees.findOne({email, role: "Admin"});
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

export const employeeLogin: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { role } = req.query;
    try {
        if(!role) return jsonResponse.clientError("Invalid role");
        const { email, password } = req.body;
        if(!email) return jsonResponse.clientError("Please provide email");
        if(!password) return jsonResponse.clientError("Please provide password");
        const employee = await Employees.findOne({email, role});
        if(!employee) return jsonResponse.clientError("Acount not found");
        const password_matched = await bcrypt.compare(password, employee.password);
        if(!password_matched) return jsonResponse.clientError("Invalid password");
        //jwt
        const token = jwt.sign({user_id: employee.user_id}, EMPLOYEE_SECRET, {expiresIn: "10d"});
        res.cookie("session", token, options);
        delete (employee as any).password;
        jsonResponse.success({employee, token}, "Scucessfully logged in");
    } catch (error) {
        console.log(error)
        jsonResponse.serverError();
    }
} 
