import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "@shared/User";
import { Dashboard } from "@shared/Dashboard";
const dashboardReducer = createSlice({
    name: "dashboard",
    initialState: {data: null} as {data: Dashboard|null},
    reducers: {
        addDashboard: (state, action: PayloadAction<Dashboard>) => {
            state.data = action.payload;
        },
    }
})

export default dashboardReducer.reducer;
export const { addDashboard } = dashboardReducer.actions;