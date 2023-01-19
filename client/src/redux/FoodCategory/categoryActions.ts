import { FoodCategory } from "@shared/Menu";
import { FoodCategoryActionTypes } from "./categoryActionTypes";

// export function addFoodCategoriesArray(foodCategories: FoodCategory[]): Action<FoodCategoryActionTypes, FoodCategory[]>{
//     return {
//         type: FoodCategoryActionTypes.ADD_FOOD_CATEGORIES_ARRAY,
//         payload: foodCategories
//     }
// }

export const addFoodCategoriesArray: ActionFunction<FoodCategoryActionTypes, FoodCategory[]> = (foodCategories) => ({
    type: FoodCategoryActionTypes.ADD_FOOD_CATEGORIES_ARRAY,
    payload: foodCategories
})

export const addFoodCategory: ActionFunction<FoodCategoryActionTypes, FoodCategory> = (f) => ({
    type: FoodCategoryActionTypes.ADD_FOOD_CATEGORY,
    payload: f
})

export const removeFoodCategory: ActionFunction<FoodCategoryActionTypes, FoodCategory> = (f) => ({
    type: FoodCategoryActionTypes.DELETE_FOOD_CATEGORIES,
    payload: f
})