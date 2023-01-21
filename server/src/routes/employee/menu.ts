import { Router } from "express";
import { retrieveCategory, retrieveFoodById, retrieveFoods } from "../../controller/employee/menu-controller";

const router = Router();


//category routes
router.get("/categories", retrieveCategory);

//food routes
router.get("/foods", retrieveFoods);
router.get("/foods/:id", retrieveFoodById);


export { router as EmployeeMenuRoutes }