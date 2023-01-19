import { FoodCategory } from "@shared/Menu";
import { FoodCategoryActionTypes } from "./categoryActionTypes";

export function foodCategoriesReducer(state: FoodCategory[] = [], action: Action<FoodCategoryActionTypes, FoodCategory[]|FoodCategory>): FoodCategory[]{
    switch(action.type){
        case FoodCategoryActionTypes.ADD_FOOD_CATEGORIES_ARRAY:
            return action.payload as FoodCategory[];
        case FoodCategoryActionTypes.DELETE_FOOD_CATEGORIES:
            const newState = [...state];
            return newState.filter(x=>x.food_category_id !== (action.payload as FoodCategory).food_category_id);
        case FoodCategoryActionTypes.ADD_FOOD_CATEGORY:
            return [(action.payload as FoodCategory), ...state];    
        default:
            return state;
    }
}