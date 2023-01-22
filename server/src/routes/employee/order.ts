import { retrieveOrders } from "../../controller/employee/order-controller";
import { Router } from "express";

const router = Router();

router.get("/", retrieveOrders);

export { router as OrderRoutes };
