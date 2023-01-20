import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeReducer";
import seatReducer from "./seatReducer";
import takeorderReducer from "./takeorderReducer";

const store = configureStore({
    reducer: {
        current_employee: employeeReducer,
        seats: seatReducer,
        takeorder: takeorderReducer
    }
})
const state = store.getState();
export type RootState = typeof state
export default store;