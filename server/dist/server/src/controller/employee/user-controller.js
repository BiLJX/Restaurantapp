"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveCurrentEmployee = void 0;
var Response_1 = __importDefault(require("../../utils/Response"));
var retrieveCurrentEmployee = function (req, res) {
    var jsonResponse = new Response_1.default(res);
    try {
        jsonResponse.success(res.locals.employee);
    }
    catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
};
exports.retrieveCurrentEmployee = retrieveCurrentEmployee;
