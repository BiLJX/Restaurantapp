import { Router } from "express";
import { adminAuth as adminAuthMiddle } from "../middleware/adminAuth";
import { AdminRoutes } from "./admin";
import { AuthRoutes } from "./auth";
import { AdminUserRoutes } from "./admin/user";
import { EmployeeRoutes } from "./employee";
import { employeeAuthMiddleware } from "../middleware/employeeAuth";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/admin/", adminAuthMiddle, AdminRoutes);
router.use("/employee/", employeeAuthMiddleware ,EmployeeRoutes)
export { router as ApiRoutes}