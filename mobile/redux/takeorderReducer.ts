import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "@shared/Menu"
export interface FoodOrder extends Food{
    quantity: number
}
interface TakeorderState {
    seat_id: string,
    foods: FoodOrder[],
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
            state.seat_id = action.payload
        }
    }
})

export default takeorderReducer.reducer;
export const { selectSeat } = takeorderReducer.actions; 