declare type AuthStackParamList = {
    "On Boarding": undefined,
    "Login Chef": undefined,
    "Login Waiter": undefined
}

declare type WaiterStackParamList = {
    "Home",
    "Tables",
    "Menu",
    "Food": {
        food_id: string,
        image_url: string,
        name: string,
        price: number;
        food_category_id: string;
        category_name: string;
        description: string;
    },
    "List",
    "Orders",
    "Bill",
}