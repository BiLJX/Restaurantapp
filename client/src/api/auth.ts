import axios from "./instance";
import { Admin } from "@shared/User";

export const getCurrentAdmin = async() => {
    const res = await axios.get("/api/admin/user/current");
    return res.data as ApiResponse<Admin>;
}

export const adminLogin = async (email: string, password: string) => {
    const res = await axios.post("/api/auth/admin/login", {email, password});
    return res.data as ApiResponse<Admin>;
}