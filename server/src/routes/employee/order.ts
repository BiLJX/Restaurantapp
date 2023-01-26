import { billPaid, retrieveBill, retrieveOrders } from "../../controller/employee/order-controller";
import { Router } from "express";

const router = Router();

router.get("/", retrieveOrders);
router.get("/bill/:seat_id", retrieveBill);
router.put("/bill/paid/:seat_id", billPaid);
export { router as OrderRoutes };
