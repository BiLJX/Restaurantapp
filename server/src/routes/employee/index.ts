import { Router } from "express";
import { EmployeeMenuRoutes } from "./menu";
import { OrderRoutes } from "./order";
import { EmployeeSeatRoutes } from "./seat";
import { EmployeeUserRoutes } from "./user";

const router = Router();

router.use("/user", EmployeeUserRoutes);
router.use("/seats", EmployeeSeatRoutes);
router.use("/menu", EmployeeMenuRoutes);
router.use("/orders", OrderRoutes);
export { router as EmployeeRoutes }