import { Router } from "express";
import { adminLogin, employeeLogin } from "../controller/auth-controller";

const router = Router();

router.post("/admin/login", adminLogin);
router.post("/employee/login", employeeLogin);
export { router as AuthRoutes }