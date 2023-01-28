import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "@shared/Menu";
const foodReducer = createSlice({
    name: "food",
    initialState: [] as Food[],
    reducers: {
        addFoodArray: (state, action: PayloadAction<Food[]>) => {
            return state = action.payload;
        },
        addFood: (state, action: PayloadAction<Food>) => {
            return state = [action.payload, ...state];
        },
        updateFood: (state, action: PayloadAction<Food>) => {
            state[state.findIndex(x=>x.food_id === action.payload.food_id)] = action.payload;
        },
        removeFood: (state, action: PayloadAction<string>) => {
            return state = state.filter(x=>x.food_id !== action.payload);
        }
    }
})

export default foodReducer.reducer;
export const { 
    addFoodArray,
    addFood,
    removeFood,
    updateFood 
} = foodReducer.actions;