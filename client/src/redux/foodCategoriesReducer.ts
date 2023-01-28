import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FoodCategory } from "@shared/Menu";
const foodCategoriesReducer = createSlice({
    name: "food_categories",
    initialState: [] as FoodCategory[],
    reducers: {
        addFoodCategoriesArray: (state, action: PayloadAction<FoodCategory[]>) => {
            return state = action.payload;
        },
        removeFoodCategory: (state, action: PayloadAction<string>) => {
            return state = state.filter(x=>x.food_category_id !== action.payload);
        },
        addFoodCategory: (state, action: PayloadAction<FoodCategory>) => {
            return state = [action.payload, ...state];
        }
    }
})

export default foodCategoriesReducer.reducer;
export const { addFoodCategory, addFoodCategoriesArray, removeFoodCategory } = foodCategoriesReducer.actions;