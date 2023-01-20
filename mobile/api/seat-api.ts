import axios from "./axios";
import { Seat } from "@shared/Seat";
export const getSeats = async(seat_name?: string) => {
    const res = await axios.get("/api/employee/seats", {
        params: {seat_name}
    });
    return res.data as ApiResponse<Seat[]>;
}