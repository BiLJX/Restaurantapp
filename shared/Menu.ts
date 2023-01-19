export interface FoodCategory {
    restaurant_id: string;
    name: string;
    food_category_id: string;
    total_items: number;
    is_deletable: boolean;
}

export interface Food {
    food_id: string;
    restaurant_id: string;
    image_url: string;
    name: string;
    price: number;
    description: string;
    food_category_id: string;
    category_name: string;
}