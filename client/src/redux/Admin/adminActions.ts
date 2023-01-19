import { Admin } from "@shared/User";
import { AdminActionsTypes } from "./adminTypes";

export function adminSignIn(admin: Admin|null): Action<AdminActionsTypes, Admin|null> {
    return {
        type: AdminActionsTypes.SIGN_IN,
        payload: admin
    }
}