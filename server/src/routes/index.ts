import { Router } from "express";
import { adminAuth as adminAuthMiddle } from "../middleware/adminAuth";
import { AdminRoutes } from "./admin";
import { AdminAuthRoutes } from "./admin/auth";
import { AdminUserRoutes } from "./admin/user";

const router = Router();

router.use("/auth/admin", AdminAuthRoutes);
router.use("/admin/", adminAuthMiddle, AdminRoutes);

export { router as ApiRoutes}