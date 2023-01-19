import { Food } from "@shared/Menu";
import { FoodActionTypes } from "./foodActionTypes";

export function foodReducer(state: Food[] = [], action: Action<FoodActionTypes, Food[]|Food>): Food[] {
    switch(action.type){
        case FoodActionTypes.ADD_FOOD_ARRAY:
            return action.payload as Food[];
        case FoodActionTypes.ADD_FOOD:
            return [action.payload as Food, ...state];
        case FoodActionTypes.UPDATE_FOOD:
            var foods = [...state];
            var i = foods.findIndex(x=>x.food_id === (action.payload as Food).food_id);
            foods[i] = action.payload as Food;
            return foods;
        case FoodActionTypes.REMOVE_FOOD:
            return state.filter(x=>x.food_id !== (action.payload as Food).food_id);
        default:
            return state
    }
}