import { Admin } from "@shared/User";
import { AdminActionsTypes } from "./adminTypes";

export function adminReducer(state: Admin|null = null, action: Action<AdminActionsTypes, Admin|null>): Admin|null{
    switch(action.type){
        case AdminActionsTypes.SIGN_IN:
            return action.payload;
        default:
            return state;
    }
}