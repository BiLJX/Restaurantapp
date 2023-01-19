import { Food, FoodCategory } from "@shared/Menu"
import { Admin, Employee } from "@shared/User"



declare interface RootState {
    current_admin: Admin|null|undefined,
    food_categories: FoodCategory[],
    foods: Food[],
    employees: Employee[]
}
