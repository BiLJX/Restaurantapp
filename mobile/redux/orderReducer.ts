import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderItem } from "@shared/Order";
const orderReducer = createSlice({
    name: "orders",
    initialState: [] as OrderItem[],
    reducers: {
        addOrderList: (state, action: PayloadAction<OrderItem[]>) => {
            return state = action.payload;
        },
        addOrderItems: (state, action: PayloadAction<OrderItem[]>) => {
            return state = [...action.payload, ...state]
        }
    }
})

export default orderReducer.reducer;
export const { addOrderList, addOrderItems } = orderReducer.actions