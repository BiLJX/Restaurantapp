"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDashboardRoutes = void 0;
var dashboard_controller_1 = require("../../controller/employee/dashboard-controller");
var express_1 = require("express");
var router = (0, express_1.Router)();
exports.AdminDashboardRoutes = router;
router.get("/", dashboard_controller_1.retrieveDashboard);
