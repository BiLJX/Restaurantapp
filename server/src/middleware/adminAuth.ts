import { NextFunction, Request, Response } from "express";
import { Controller } from "../types/controller";
import JsonResponse from "../utils/Response";
import jwt from "jsonwebtoken";
import { ADMIN_SECRET } from "../secret";
import { Admins } from "../models/Admin";
import { Employees } from "../models/Employee";

export const adminAuth = async(req: Request, res: Response, next: NextFunction) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const session = req.cookies.session;
        if(!session) return jsonResponse.notAuthorized();
        const decodedData: {user_id: string}|undefined = <any>jwt.verify(session, ADMIN_SECRET);
        if(!decodedData) return jsonResponse.notAuthorized();
        const admin = await Employees.aggregate([
            {
                $match: {
                    user_id: decodedData.user_id, 
                    role: "Admin"
                },
            },
            {
                $lookup: {
                    as: "restaurant",
                    from: "restaurants",
                    foreignField: "restaurant_id",
                    localField: "restaurant_id"
                },
            },
            {
                $unwind: "$restaurant"
            }
        ]);
        if(!admin) return jsonResponse.notAuthorized("Account not found");
        res.locals.admin = admin;
        next();
    } catch (error) {
        console.log(error);
        jsonResponse.notAuthorized();
    }
}