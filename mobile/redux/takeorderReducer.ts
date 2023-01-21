import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "@shared/Menu"
export interface FoodOrderItem extends Food{
    quantity: number
}
interface TakeorderState {
    seat_id: string,
    foods: FoodOrderItem[],
}

const initialState: TakeorderState = {
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
        addFoodToTakeOrder: (state, action: PayloadAction<FoodOrderItem>) => {
            state.foods.push(action.payload)
        },
        updateFoodOfTakeOrder: (state, action: PayloadAction<FoodOrderItem>) => {
            state.foods = state.foods.map(x=>{
                if(x.food_id === action.payload.food_id){
                    x = action.payload
                }
                return x;
            })
        },
        removeFoodFromTakeOrder: (state, action: PayloadAction<string>) => {
            state.foods = state.foods.filter(x=>x.food_id !== action.payload);
        }
    }
})

export default takeorderReducer.reducer;
export const { selectSeat, addFoodToTakeOrder, removeFoodFromTakeOrder, updateFoodOfTakeOrder } = takeorderReducer.actions; 