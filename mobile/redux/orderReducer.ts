import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderItem } from "@shared/Order";
const orderReducer = createSlice({
    name: "orders",
    initialState: [] as OrderItem[],
    reducers: {
        addOrderList: (state, action: PayloadAction<OrderItem[]>) => {
            return state = action.payload;
        }
    }
})

export default orderReducer.reducer;
export const { addOrderList } = orderReducer.actions