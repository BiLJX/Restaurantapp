declare interface ApiResponse<T={}>{
    error: boolean,
    status: number,
    data: T,
    message: string
}

declare interface CreateFoodData {
    name: string,
    description: string,
    price: number,
    food_category_id: string;
    image?: File|undefined;
    image_url: string;
}

declare interface CreateEmployeeData {
    full_name: string;
    email: string;
    gender: string;
    contact_no: number;
    password: string;
    image?: File|undefined|null;
    profile_pic_url: string;
    role: string;
}