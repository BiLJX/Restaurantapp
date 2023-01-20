import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeReducer";
import seatReducer from "./seatReducer";

const store = configureStore({
    reducer: {
        current_employee: employeeReducer,
        seats: seatReducer
    }
})
const state = store.getState();
export type RootState = typeof state
export default store;