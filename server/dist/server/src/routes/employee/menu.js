"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeMenuRoutes = void 0;
var express_1 = require("express");
var menu_controller_1 = require("../../controller/employee/menu-controller");
var router = (0, express_1.Router)();
exports.EmployeeMenuRoutes = router;
//category routes
router.get("/categories", menu_controller_1.retrieveCategory);
//food routes
router.get("/foods", menu_controller_1.retrieveFoods);
router.get("/foods/:id", menu_controller_1.retrieveFoodById);
