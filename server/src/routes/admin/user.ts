import { Router } from "express";
import { createEmployee, deleteEmployee, editEmployee, getCurrentAdmin, retrieveEmployee, retrieveEmployeeById } from "../../controller/admin/user-controller";

const router = Router();

router.get("/current", getCurrentAdmin);

router.post("/employee/create", createEmployee);
router.get("/employee", retrieveEmployee);
router.get("/employee/:id", retrieveEmployeeById);
router.patch("/employee/edit", editEmployee);
router.delete("/employee/delete/:id", deleteEmployee);

export { router as AdminUserRoutes };