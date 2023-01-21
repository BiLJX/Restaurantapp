import JsonResponse from "../../utils/Response";

import { Controller } from "../../types/controller";
import { Foods } from "../../models/Food";
import { Employee } from "@shared/User";
import { FoodCategories } from "../../models/FoodCategory";



export const retrieveCategory: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { restaurant_id }: Employee = res.locals.employee;
    try {
        const categories = await FoodCategories.aggregate([
            {
                $match: {
                    restaurant_id: restaurant_id
                }
            },
            {
                $lookup: {
                    from: "foods",
                    localField: "food_category_id",
                    foreignField: "food_category_id",
                    as: "foods"
                }
            },
            {
                $addFields: {
                    total_items: { $size: "$foods" }
                }
            }
        ])
        jsonResponse.success(categories.map(x=>{
            x.is_deletable = x.total_items === 0
            return x;
        }));
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const retrieveFoods: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { restaurant_id } = res.locals.employee;
    const {category, search} = req.query;
    try {
        const matchCreate = () => {
            if(category && search) return ({$match: {restaurant_id, food_category_id: category, name: {'$regex': search, '$options': "i"}}});
            if(category) return ({$match: {restaurant_id, food_category_id: category}});
            if(search) return ({$match: {restaurant_id, name: {'$regex': search, '$options': "i"}}});
            return ({$match: {restaurant_id}})
        }
        const foods = await Foods.aggregate([
            matchCreate(),
            {
                $lookup: {
                    as: "category_data",
                    from: "food_categories",
                    localField: "food_category_id",
                    foreignField: "food_category_id"
                }
            },
            {
                $unwind: {
                    path: "$category_data",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $addFields: {
                    category_name: "$category_data.name"
                }
            },
            {
                $project: {
                    category_data: 0
                }
            }
        ])
        jsonResponse.success(foods);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const retrieveFoodById: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const {restaurant_id}: Employee = res.locals.employee;
    const food_id = req.params.id;
    try {
        const foods = await Foods.aggregate([
            {
                $match: {
                    restaurant_id,
                    food_id
                }
            },
            {
                $lookup: {
                    as: "category_data",
                    from: "food_categories",
                    localField: "food_category_id",
                    foreignField: "food_category_id"
                }
            },
            {
                $unwind: "$category_data"
            },
            {
                $addFields: {
                    category_name: "$category_data.name"
                }
            }
        ])
        if(foods.length === 0) return jsonResponse.notFound("Food item not found");
        jsonResponse.success(foods[0]);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}