import { Router } from "express";
import { AdminDashboardRoutes } from "./dashboard";
import { AdminMenuRoutes } from "./menu";
import { AdminSeatRoutes } from "./seat";
import { AdminUserRoutes } from "./user";

const router = Router();

router.use("/user", AdminUserRoutes)
router.use("/menu", AdminMenuRoutes)
router.use("/seats", AdminSeatRoutes)
router.use("/dashboard", AdminDashboardRoutes)
export { router as AdminRoutes }

