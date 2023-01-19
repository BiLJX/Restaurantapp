import { Router } from "express";
import { adminAuth as adminAuthMiddle } from "../middleware/adminAuth";
import { AdminRoutes } from "./admin";
import { AuthRoutes } from "./auth";
import { AdminUserRoutes } from "./admin/user";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/admin/", adminAuthMiddle, AdminRoutes);

export { router as ApiRoutes}