import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "@shared/User";

interface State {
    data: Employee|null
}
const employeeReducer = createSlice({
    name: "current_employee",
    initialState: {data: null} as State,
    reducers: {
        addCurrentEmployee: (state, action: PayloadAction<Employee|null>) => {
            state.data = action.payload
        },
        removeCurrentEmployee: (state) => {
            state.data = null;
        }
    }
})

export const { addCurrentEmployee, removeCurrentEmployee } = employeeReducer.actions;
export default employeeReducer.reducer