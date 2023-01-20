import { Router } from "express";
import { EmployeeSeatRoutes } from "./seat";
import { EmployeeUserRoutes } from "./user";

const router = Router();

router.use("/user", EmployeeUserRoutes)
router.use("/seats", EmployeeSeatRoutes)

export { router as EmployeeRoutes }