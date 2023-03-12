"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastDays = exports.getToday = void 0;
var moment_1 = __importDefault(require("moment"));
var getToday = function () {
    var now = (0, moment_1.default)();
    var start = now.startOf("day").toDate();
    var end = now.endOf("day").toDate();
    return {
        $gte: start,
        $lt: end
    };
};
exports.getToday = getToday;
var getLastDays = function (days) {
    return {
        $gte: (0, moment_1.default)().subtract(days, "days").toDate(),
    };
};
exports.getLastDays = getLastDays;
