import { Router } from "express";
import { EmployeeUserRoutes } from "./user";

const router = Router();

router.use("/user", EmployeeUserRoutes)

export { router as EmployeeRoutes }