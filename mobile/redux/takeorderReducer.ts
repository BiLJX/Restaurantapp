import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "@shared/Menu"
import { TakeOrderItem, TakeorderClientData } from "@shared/Order"
const initialState: TakeorderClientData = {
    seat_id: "",
    foods: []
}

const takeorderReducer = createSlice({
    name: "takeorder",
    initialState,
    reducers: {
        selectSeat: (state, action: PayloadAction<string>) => {
            state.foods = [];
            state.seat_id = action.payload;
        },
        addFoodToTakeOrder: (state, action: PayloadAction<TakeOrderItem>) => {
            state.foods.push(action.payload)
        },
        updateFoodOfTakeOrder: (state, action: PayloadAction<TakeOrderItem>) => {
            state.foods = state.foods.map(x=>{
                if(x.food_id === action.payload.food_id){
                    x = action.payload
                }
                return x;
            })
        },
        removeFoodFromTakeOrder: (state, action: PayloadAction<string>) => {
            state.foods = state.foods.filter(x=>x.food_id !== action.payload);
        },
        clearTakeOrder: (state) => {
            state.foods = []
            state.seat_id = ""
        }
    }
})

export default takeorderReducer.reducer;
export const { 
    selectSeat,
    addFoodToTakeOrder, 
    removeFoodFromTakeOrder,
    updateFoodOfTakeOrder,
    clearTakeOrder
} = takeorderReducer.actions; 