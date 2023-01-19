import axios from "./instance";
import { Seat } from "@shared/Seat";

export const createSeat = async(seat_name: string) => {
    const res = await axios.post("/api/admin/seats/create", {seat_name});
    return res.data as ApiResponse<Seat>
}

export const retrieveSeats = async() => {
    const res = await axios.get("/api/admin/seats");
    return res.data as ApiResponse<Seat[]>;
}

export const deleteSeat = async(seat_id: string) => {
    const res = await axios.delete("/api/admin/seats/delete/"+seat_id);
    return res.data as ApiResponse<Seat[]>;
}