"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
var express_1 = require("express");
var auth_controller_1 = require("../controller/auth-controller");
var router = (0, express_1.Router)();
exports.AuthRoutes = router;
router.post("/admin/login", auth_controller_1.adminLogin);
router.post("/employee/login", auth_controller_1.employeeLogin);
