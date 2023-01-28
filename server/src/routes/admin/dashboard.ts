import { retrieveDashboard } from "../../controller/employee/dashboard-controller";
import { Router } from "express";

const router = Router();

router.get("/", retrieveDashboard);

export { router as AdminDashboardRoutes }