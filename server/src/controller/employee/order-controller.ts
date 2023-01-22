import { Orders } from "../../models/Order";
import { Controller } from "../../types/controller";
import JsonResponse from "../../utils/Response";

export const retrieveOrders: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { status, seat_id } = req.query as {status: string, seat_id: string};
        const { restaurant_id } = res.locals.employee;
        const find = () => {
            if(status && seat_id) return {restaurant_id, status, seat_id};
            if(status) return {restaurant_id, status};
            if(seat_id) return {restaurant_id, seat_id}
            return {restaurant_id}
        }
        const orders = await Orders.find(find()).populate("food");
        jsonResponse.success(orders);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}