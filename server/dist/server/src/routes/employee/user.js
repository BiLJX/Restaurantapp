"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeUserRoutes = void 0;
var user_controller_1 = require("../../controller/employee/user-controller");
var express_1 = require("express");
var router = (0, express_1.Router)();
exports.EmployeeUserRoutes = router;
router.get("/current", user_controller_1.retrieveCurrentEmployee);
