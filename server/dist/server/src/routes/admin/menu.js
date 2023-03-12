"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMenuRoutes = void 0;
var express_1 = require("express");
var menu_controller_1 = require("../../controller/admin/menu-controller");
var router = (0, express_1.Router)();
exports.AdminMenuRoutes = router;
//category routes
router.post("/categories/create", menu_controller_1.createCategory);
router.get("/categories", menu_controller_1.retrieveCategory);
router.patch("/categories/edit", menu_controller_1.editCategory);
router.delete("/categories/delete/:id", menu_controller_1.deleteCategory);
//food routes
router.post("/foods/create", menu_controller_1.createFood);
router.get("/foods", menu_controller_1.retrieveFoods);
router.get("/foods/:id", menu_controller_1.retrieveFoodById);
router.patch("/foods/edit", menu_controller_1.editFood);
router.delete("/foods/delete/:id", menu_controller_1.deleteFood);
