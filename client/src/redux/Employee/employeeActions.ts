import { Employee } from "@shared/User";
import { EmployeeActionTypes } from "./employeeActionTypes";

export const addEmployeeArray: ActionFunction<EmployeeActionTypes, Employee[]> = (employee_arr) => {
    return {
        type: EmployeeActionTypes.ADD_EMPLOYEE_ARRAY,
        payload: employee_arr
    }
}

export const addEmployee:  ActionFunction<EmployeeActionTypes, Employee> = (employee) => {
    return {
        type: EmployeeActionTypes.ADD_EMPLOYEE,
        payload: employee
    }
}

export const updateEmployee: ActionFunction<EmployeeActionTypes, Employee> = employee => {
    return {
        type: EmployeeActionTypes.UPDATE_EMPLOYEE,
        payload: employee
    }
}

export const removeEmployee: ActionFunction<EmployeeActionTypes, Employee> = employee => {
    return {
        type: EmployeeActionTypes.REMOVE_EMPLOYEE,
        payload: employee
    }
}
