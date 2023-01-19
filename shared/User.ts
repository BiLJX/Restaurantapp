interface User {
    user_id: string;
    restaurant_id: string;
    full_name: string;
    email: string;
    gender: "Male"|"Female";
    contact_no: number;
    password: string;
    profile_pic_url: string;
    createdAt: Date;
}

export interface Admin extends User {}

export interface Employee extends User {
    role: "Chef"|"Waiter"
}