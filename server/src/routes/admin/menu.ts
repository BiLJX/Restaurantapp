import { Router } from "express";
import { createCategory, createFood, deleteCategory, deleteFood, editCategory, editFood, retrieveCategory, retrieveFoodById, retrieveFoods } from "../../controller/admin/menu-controller";

const router = Router();


//category routes
router.post("/categories/create", createCategory);
router.get("/categories", retrieveCategory);
router.patch("/categories/edit", editCategory);
router.delete("/categories/delete/:id", deleteCategory);

//food routes
router.post("/foods/create", createFood);
router.get("/foods", retrieveFoods);
router.get("/foods/:id", retrieveFoodById);
router.patch("/foods/edit", editFood);
router.delete("/foods/delete/:id", deleteFood);

export { router as AdminMenuRoutes }