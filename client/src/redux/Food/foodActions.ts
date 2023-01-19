import { Food } from "@shared/Menu";
import { FoodActionTypes } from "./foodActionTypes";

export const addFoodArray: ActionFunction<FoodActionTypes, Food[]> = (food_arr) => {
    return {
        type: FoodActionTypes.ADD_FOOD_ARRAY,
        payload: food_arr
    }
}

export const addFood: ActionFunction<FoodActionTypes, Food> = (food) => {
    return {
        type: FoodActionTypes.ADD_FOOD,
        payload: food
    }
}

export const removeFood: ActionFunction<FoodActionTypes, Food> = (food) => {
    return {
        type: FoodActionTypes.REMOVE_FOOD,
        payload: food
    }
}

export const updateFood: ActionFunction<FoodActionTypes, Food> = (food) => {
    return {
        type: FoodActionTypes.UPDATE_FOOD,
        payload: food
    }
}