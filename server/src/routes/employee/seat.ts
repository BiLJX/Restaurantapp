import { retrieveSeats } from "../../controller/employee/seat-controller";
import { Router } from "express";

const router = Router();
router.get("/", retrieveSeats);
export { router as EmployeeSeatRoutes }