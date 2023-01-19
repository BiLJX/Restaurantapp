import { NextFunction, Request, Response } from "express";
import { Controller } from "../types/controller";
import JsonResponse from "../utils/Response";
import jwt from "jsonwebtoken";
import { EMPLOYEE_SECRET } from "../secret";
import { Admins } from "../models/Admin";
import { Employees } from "../models/Employee";

export const employeeAuth = async(req: Request, res: Response, next: NextFunction) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const session = req.headers.Authorization as string;
        if(!session) return jsonResponse.notAuthorized();
        const decodedData: {user_id: string}|undefined = <any>jwt.verify(session, EMPLOYEE_SECRET);
        if(!decodedData) return jsonResponse.notAuthorized();
        const employee = await Employees.findOne({user_id: decodedData.user_id, role: {$not: "Admin"}}).select("-password");
        if(!employee) return jsonResponse.notAuthorized("Account not found");
        res.locals.employee = employee;
        next();
    } catch (error) {
        console.log(error);
        jsonResponse.notAuthorized();
    }
}