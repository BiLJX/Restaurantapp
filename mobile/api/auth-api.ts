import axios from "./axios";
import { Employee } from "@shared/User";

export const login = async(data: {email: string, password: string, role: "Chef"|"Waiter"}) => {
    
    const res = await axios.post("/api/auth/admin/login", data);

    return res.data as ApiResponse<{employee: Employee}>;
}

