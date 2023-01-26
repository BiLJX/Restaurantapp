import { retrieveBill, retrieveOrders } from "../../controller/employee/order-controller";
import { Router } from "express";

const router = Router();

router.get("/", retrieveOrders);
router.get("/bill/:seat_id", retrieveBill);
export { router as OrderRoutes };
