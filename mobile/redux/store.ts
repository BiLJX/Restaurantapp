import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employee/employeeReducer";

const store = configureStore({
    reducer: {
        current_employee: employeeReducer
    }
})
const state = store.getState();
export type RootState = typeof state
export default store;