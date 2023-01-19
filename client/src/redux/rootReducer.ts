import { combineReducers } from "redux";
import { RootState } from "types";
import { adminReducer } from "./Admin/adminReducer"
import { employeeReducer } from "./Employee/employeeReducer";
import { foodReducer } from "./Food/foodReducer";
import { foodCategoriesReducer } from "./FoodCategory/categoryReducer";
export const rootReducer = combineReducers<RootState>({
    current_admin: adminReducer,
    food_categories: foodCategoriesReducer,
    foods: foodReducer,
    employees: employeeReducer
})

