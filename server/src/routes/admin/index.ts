import { Router } from "express";
import { AdminAuthRoutes } from "./auth";
import { AdminMenuRoutes } from "./menu";
import { AdminSeatRoutes } from "./seat";
import { AdminUserRoutes } from "./user";

const router = Router();

router.use("/user", AdminUserRoutes)
router.use("/menu", AdminMenuRoutes)
router.use("/seats", AdminSeatRoutes)
export { router as AdminRoutes }

