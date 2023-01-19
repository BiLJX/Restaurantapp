import { Seats } from "../../models/Seat";
import { Controller } from "../../types/controller";
import JsonResponse from "../../utils/Response";

export const retrieveCurrentEmployee: Controller = (req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        jsonResponse.success(res.locals.employee);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

