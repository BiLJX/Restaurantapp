import { Employee } from "@shared/User";
import { EmployeeActionTypes } from "./employeeActionTypes";

export function employeeReducer(state: Employee[] = [], action: Action<EmployeeActionTypes, Employee|Employee[]>): Employee[] {
    switch(action.type){
        case EmployeeActionTypes.ADD_EMPLOYEE_ARRAY:
            return action.payload as Employee[]
        case EmployeeActionTypes.ADD_EMPLOYEE:
            return [action.payload as Employee, ...state];
        case EmployeeActionTypes.UPDATE_EMPLOYEE:
            var employees = [...state];
            var i = employees.findIndex(x=>x.user_id === (action.payload as Employee).user_id);
            employees[i] = action.payload as Employee;
            return employees;
        case EmployeeActionTypes.REMOVE_EMPLOYEE:
            return state.filter(x=>x.user_id !== (action.payload as Employee).user_id);
        default: 
            return state;
    }
}