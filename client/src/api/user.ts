import { Employee } from "@shared/User";
import axios from "./instance";

export const createEmployee = async(datas: CreateEmployeeData) => {
    const formData = new FormData();
    for(let data in datas){
        formData.append(data, (datas as any)[data]);
    }
    const res = await axios.post("/api/admin/user/employee/create", formData);
    return res.data as ApiResponse<Employee>;
}

export const getEmployees = async(search_query: string = "") => {
    const res = await axios.get("/api/admin/user/employee", {
        params: {search_query}
    });
    return res.data as ApiResponse<Employee[]>;
}

export const getEmployeeById = async(id: string) => {
    const res = await axios.get("/api/admin/user/employee/"+id);
    return res.data as ApiResponse<Employee>;
}

export const editEmployee = async(datas: CreateEmployeeData) => {
    const formData = new FormData();
    delete (datas as any).profile_pic_url
    for(let data in datas){
        formData.append(data, (datas as any)[data]);
    }
    const res = await axios.patch("/api/admin/user/employee/edit", formData);
    return res.data as ApiResponse<Employee>;
}

export const deleteEmployee = async(id: string) => {
    const res = await axios.delete("/api/admin/user/employee/delete/"+id);
    return res.data as ApiResponse;
}