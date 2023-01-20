import { retrieveCurrentEmployee } from "../../controller/employee/user-controller";
import { Router } from "express";

const router = Router();

router.get("/current", retrieveCurrentEmployee);

export { router as EmployeeUserRoutes }