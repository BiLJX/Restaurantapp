import JsonResponse from "../../utils/Response";
import { Seats } from "../../models/Seat";
import { Controller } from "../../types/controller";

export const retrieveSeats: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { restaurant_id } = res.locals.employee;
    const { seat_name } = req.query;
    try {
        const seats = await Seats.find({restaurant_id, seat_name: {$regex: seat_name, $options: "i"}});
        jsonResponse.success(seats);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}