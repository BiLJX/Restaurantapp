import JsonResponse from "../../utils/Response";
import { Controller } from "../../types/controller";
import { FoodCategories } from "../../models/FoodCategory";
import { makeId } from "../../utils/idgen";
import { Admin } from "@shared/User";
import { Food } from "@shared/Menu";
import { Foods } from "../../models/Food";
import { upload, uploadFile, removeFile } from "../../utils/upload";
import sharp from "sharp";

//category
export const createCategory: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const admin: Admin = res.locals.admin;
    try {
        const { name } = req.body;
        if(!name) return jsonResponse.clientError("Please enter name");
        const category = new FoodCategories({
            name,
            food_category_id: makeId(),
            restaurant_id: admin.restaurant_id
        })
        await category.save();
        let newCat = category.toJSON()
        newCat.is_deletable = true;
        newCat.total_items = 0;
        jsonResponse.success(newCat);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const retrieveCategory: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const admin: Admin = res.locals.admin;
    try {
        const categories = await FoodCategories.aggregate([
            {
                $match: {
                    restaurant_id: admin.restaurant_id
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

export const editCategory: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const {restaurant_id}: Admin = res.locals.admin;
    try {
        const { name, food_category_id } = req.body;
        if(!food_category_id) return jsonResponse.clientError("Please choose category to edit");
        if(!name) return jsonResponse.clientError("Please enter name");
        await FoodCategories.findOneAndUpdate({restaurant_id, food_category_id}, {
            $set: {
                name
            }
        })
        jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const deleteCategory: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const {restaurant_id}: Admin = res.locals.admin;
    try {
        const food_category_id = req.params.id;
        if(!food_category_id) return jsonResponse.clientError("Please select category to delete");
        await FoodCategories.findOneAndDelete({restaurant_id, food_category_id});
        jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

//food

export const createFood: Controller = async(req, res) => {
    const {restaurant_id}: Admin = res.locals.admin;
    upload(req, res, async err=>{
        const jsonResponse = new JsonResponse(res);
        if(err) {
            console.log(err);
            return jsonResponse.serverError()
        }
        try {
            const client_data: Food = req.body;
            const files = <Express.Multer.File[]>req.files;
            if(!files) return jsonResponse.clientError("Please upload a image");
            const image = files[0];
            if(!image) return jsonResponse.clientError("Please upload a image");
            if(!client_data.name) return jsonResponse.clientError("Enter name");
            if(client_data.name.length > 20) return jsonResponse.clientError("Name can't be more than 20 charecters");
            if(client_data.description.length > 150) return jsonResponse.clientError("Desacription cant be more than 150 charecters");
            if(!image.mimetype.includes("image")) return jsonResponse.clientError("Unsupported image type.")
            const category = await FoodCategories.findOne({restaurant_id, food_category_id: client_data.food_category_id});
            if(!category) return jsonResponse.clientError("Category not found");
            const buffer = await sharp(image.buffer).jpeg({quality: 90}).toBuffer();
            const food_id = makeId();
            const image_url = await uploadFile({buffer, dir: `restaurant/${restaurant_id}/foods/${food_id}/`});
            const food = new Foods({
                ...client_data,
                restaurant_id,
                food_id,
                image_url
            })
            await food.save();
            const _food = food.toJSON();
            _food.category_name = category.name;
            jsonResponse.success(food);
        } catch (error) {
            console.log(error);
            jsonResponse.serverError();
        }
    })
    
}

export const retrieveFoods: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const {restaurant_id}: Admin = res.locals.admin;
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
    const {restaurant_id}: Admin = res.locals.admin;
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

export const editFood: Controller = async(req, res) => {
    const {restaurant_id}: Admin = res.locals.admin;
    upload(req, res, async err => {
        const jsonResponse = new JsonResponse(res);
        if(err){
            console.log(err);
            return jsonResponse.serverError();
        }    
        try {
            const client_data: Food = req.body;
            delete (client_data as any).image_url;
            const files = <Express.Multer.File[]>req.files;
            let food: any;
            const old_food = await Foods.findOne({food_id: client_data.food_id});
            if(!old_food) return jsonResponse.clientError("Food not found");
            
            if(!client_data.name) return jsonResponse.clientError("Enter name");
            if(client_data.name.length > 20) return jsonResponse.clientError("Name can't be more than 20 charecters");
            if(client_data.description.length > 150) return jsonResponse.clientError("Desacription cant be more than 150 charecters");
            const category = await FoodCategories.findOne({restaurant_id, food_category_id: client_data.food_category_id});
            if(!category) return jsonResponse.clientError("Category not found");
            food = await Foods.findOneAndUpdate({food_id: client_data.food_id}, {
                $set: {
                    ...client_data,
                    image_url: old_food.image_url,
                }
            })
            if(files[0]){
                const image = files[0];
                if(!image.mimetype.includes("image")) return jsonResponse.clientError("Unsupported image type.")
                const buffer = await sharp(image.buffer).jpeg({quality: 90}).toBuffer();
                const image_url = await uploadFile({buffer, dir: `restaurant/${restaurant_id}/foods/${old_food.food_id}/`});
                food = await Foods.findOneAndUpdate({food_id: client_data.food_id}, {
                    $set: {
                        image_url
                    }
                })
            }
            const _food = food.toJSON();
            _food.category_name = category.name;
            jsonResponse.success(food);
        } catch (error) {
            console.log(error);
            jsonResponse.serverError();
        }
    })
    
}

export const deleteFood: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const {restaurant_id}: Admin = res.locals.admin;
    const food_id = req.params.id
    try {
        await Foods.findOneAndDelete({restaurant_id, food_id});
        await removeFile(`restaurant/${restaurant_id}/foods/${food_id}/`);
        jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}