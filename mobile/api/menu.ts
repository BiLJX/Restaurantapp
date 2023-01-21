import axios from "./axios";
import { Food, FoodCategory } from "@shared/Menu";

//categories
export const createFoodCategory = async(name: string) => {
    const res = await axios.post("/api/employee/menu/categories/create", {name});
    return res.data as ApiResponse<FoodCategory>;
}

export const getFoodCategories = async() => {
    const res = await axios.get("/api/employee/menu/categories");
    return res.data as ApiResponse<FoodCategory[]>;
}



//foods


export const getFoods = async(options?:{category: string, search?: string}) => {
    const res = await axios.get("/api/employee/menu/foods", {
        params: options
    })
    return res.data as ApiResponse<Food[]>;
}

export const getFoodById = async(id: string) => {
    const res = await axios.get("/api/employee/menu/foods/"+id);
    return res.data as ApiResponse<Food>;
}
