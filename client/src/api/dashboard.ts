import { Dashboard } from "@shared/Dashboard";
import axios from "./instance"

export const getDashboard = async() => {
    const res = await axios.get("/api/admin/dashboard");
    return res.data as ApiResponse<Dashboard>;
}