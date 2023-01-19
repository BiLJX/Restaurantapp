import { makeId } from "../../utils/idgen";
import { Seats } from "../../models/Seat";
import { Controller } from "../../types/controller";
import JsonResponse from "../../utils/Response";

export const createSeat: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { restaurant_id } = res.locals.admin;
    try {
        const { seat_name } = req.body;
        if(!seat_name) return jsonResponse.clientError("Please enter seat name");
        const seat = new Seats({
            seat_id: makeId(),
            seat_name,
            restaurant_id
        });
        await seat.save();
        jsonResponse.success(seat);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const retrieveSeats: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { restaurant_id } = res.locals.admin;
    try {
        const seats = await Seats.find({restaurant_id});
        jsonResponse.success(seats)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const deleteSeat: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { restaurant_id } = res.locals.admin;
    const { seat_id } = req.params;
    try {
        if(!seat_id) return jsonResponse.clientError("Please select a seat to delete");
        await Seats.findOneAndDelete({restaurant_id});
        jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}