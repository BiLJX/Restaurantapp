
import { Router } from "express";
import { createSeat, deleteSeat, retrieveSeats } from "../../controller/admin/seat-controller";
const router = Router();

router.post("/create", createSeat);
router.get("/", retrieveSeats);
router.delete("/delete/:seat_id", deleteSeat);

export { router as AdminSeatRoutes }