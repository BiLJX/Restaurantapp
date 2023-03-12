"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSeatRoutes = void 0;
var seat_controller_1 = require("../../controller/employee/seat-controller");
var express_1 = require("express");
var router = (0, express_1.Router)();
exports.EmployeeSeatRoutes = router;
router.get("/", seat_controller_1.retrieveSeats);
