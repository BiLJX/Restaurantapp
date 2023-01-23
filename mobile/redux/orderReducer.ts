import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderItem, OrderStatus } from "@shared/Order";
const orderReducer = createSlice({
    name: "orders",
    initialState: [] as OrderItem[],
    reducers: {
        addOrderList: (state, action: PayloadAction<OrderItem[]>) => {
            return state = action.payload;
        },
        addOrderItems: (state, action: PayloadAction<OrderItem[]>) => {
            return state = [...action.payload, ...state]
        },
        removeOrderItem: (state, action: PayloadAction<string>) => {
            return state = state.filter(x=>x.order_item_id !== action.payload)
        },
        changeOrderStatus: (state, action:PayloadAction<{order_item_id: string, status: OrderStatus}>) => {
            state.forEach(x=>{
                if(x.order_item_id === action.payload.order_item_id){
                    x.status = action.payload.status
                }
            })
        }
    }
})

export default orderReducer.reducer;
export const { addOrderList, addOrderItems, removeOrderItem, changeOrderStatus } = orderReducer.actions