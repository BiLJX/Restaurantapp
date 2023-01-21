import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "@shared/Menu";

interface InitialState {
    foods: Food[]
}

const foodReducer = createSlice({
    name: "foods",
    initialState: {foods: []} as InitialState,
    reducers: {
        addFoodArray: (state, action: PayloadAction<Food[]>) => {
            state.foods = action.payload;
        }
    }
})

export default foodReducer.reducer;
export const { addFoodArray } = foodReducer.actions;