import axios from "./instance";
import { Food, FoodCategory } from "@shared/Menu";

//categories
export const createFoodCategory = async(name: string) => {
    const res = await axios.post("/api/admin/menu/categories/create", {name});
    return res.data as ApiResponse<FoodCategory>;
}

export const getFoodCategories = async() => {
    const res = await axios.get("/api/admin/menu/categories");
    return res.data as ApiResponse<FoodCategory[]>;
}

export const editFoodCategory = async(name: string) => {
    const res = await axios.patch("/api/admin/menu/categories/edit", {name});
    return res.data as ApiResponse;
}

export const deleteFoodCategory = async(id: string) => {
    const res = await axios.delete("/api/admin/menu/categories/delete/"+id);
    return res.data as ApiResponse;
}

//foods
export const createFood = async(datas: CreateFoodData) => {
    const formData = new FormData();
    for(let data in datas){
        formData.append(data, (datas as any)[data]);
    }
    const res = await axios.post("/api/admin/menu/foods/create", formData);
    return res.data as ApiResponse<Food>;
}

export const getFoods = async(options?:{category: string, search?: string}) => {
    const res = await axios.get("/api/admin/menu/foods", {
        params: options
    })
    return res.data as ApiResponse<Food[]>;
}

export const getFoodById = async(id: string) => {
    const res = await axios.get("/api/admin/menu/foods/"+id);
    return res.data as ApiResponse<Food>;
}

export const editFood = async(datas: CreateFoodData) => {
    const formData = new FormData();
    for(let data in datas){
        formData.append(data, (datas as any)[data]);
    }
    const res = await axios.patch("/api/admin/menu/foods/edit", formData);
    return res.data as ApiResponse<Food>;
}

export const deleteFood = async(id: string) => {
    const res = await axios.delete("/api/admin/menu/foods/delete/"+id);
    return res.data as ApiResponse;
}