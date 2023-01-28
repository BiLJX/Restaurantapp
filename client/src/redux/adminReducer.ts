import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "@shared/User";

const adminReducer = createSlice({
    name: "admin",
    initialState: {data: null} as {data: Employee|null},
    reducers: {
        signIn: (state, action: PayloadAction<Employee>) => {
            state.data = action.payload;
        },
    }
})

export default adminReducer.reducer;
export const { signIn } = adminReducer.actions;