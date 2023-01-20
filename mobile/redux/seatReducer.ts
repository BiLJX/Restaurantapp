import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Seat } from "@shared/Seat";



const seatReducer = createSlice({
    name: "seats",
    initialState: [] as Seat[],
    reducers: {
        addSeatAray: (state, seat: PayloadAction<Seat[]>) => {
            return state = seat.payload
        }
    }
})

export const { addSeatAray } = seatReducer.actions;
export default seatReducer.reducer;