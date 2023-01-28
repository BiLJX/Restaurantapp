import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";
import employeeReducer from "./employeeReducer";
import foodCategoriesReducer from "./foodCategoriesReducer";
import foodReducer from "./foodReducer";

export const store = configureStore({
    reducer: {
        current_admin: adminReducer,
        food_categories: foodCategoriesReducer,
        foods: foodReducer,
        employees: employeeReducer
    }
})
const state = store.getState();
export type RootState = typeof state;