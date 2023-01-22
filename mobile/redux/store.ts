import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeReducer";
import foodReducer from "./foodReducer";
import orderReducer from "./orderReducer";
import seatReducer from "./seatReducer";
import takeorderReducer from "./takeorderReducer";

const store = configureStore({
    reducer: {
        current_employee: employeeReducer,
        seats: seatReducer,
        takeorder: takeorderReducer,
        foods: foodReducer,
        orders: orderReducer
    }
})
const state = store.getState();
export type RootState = typeof state
export default store;