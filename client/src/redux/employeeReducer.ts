import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "@shared/User";

const employeeReducer = createSlice({
    name: "employees",
    initialState: [] as Employee[],
    reducers: {
        addEmployeeArray: (state, action: PayloadAction<Employee[]>) => {
            return state = action.payload;
        },
        updateEmployee: (state, action: PayloadAction<Employee>) => {
            state[state.findIndex(x=>x.user_id === action.payload.user_id)] = action.payload;
        },
        removeEmployee: (state, action: PayloadAction<string>) => {
            return state = state.filter(x=>x.user_id !== action.payload);
        },
        addEmployee: (state, action: PayloadAction<Employee>) => {
            return state = [action.payload, ...state];
        }
    }
})

export default employeeReducer.reducer;
export const { addEmployee, addEmployeeArray, removeEmployee, updateEmployee } = employeeReducer.actions;