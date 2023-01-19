import { Router } from "express";
import { adminLogin } from "../../controller/admin/auth-controller";

const router = Router();

router.post("/login", adminLogin)

export { router as AdminAuthRoutes }