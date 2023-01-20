import axios from "./axios";
import { Employee } from "@shared/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async(data: {email: string, password: string, role: "Chef"|"Waiter"}) => {
    const res = await axios.post("/api/auth/employee/login", data);
    return res.data as ApiResponse<{employee: Employee, token: string}>;
}

export const getCurrentEmployee = async() => {
    const res = await axios.get("/api/employee/user/current");
    return res.data as ApiResponse<Employee|null>;
}

export const logout = async() => {
    await AsyncStorage.removeItem("session");
}