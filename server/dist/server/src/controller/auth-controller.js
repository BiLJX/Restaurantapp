"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeLogin = exports.adminLogin = void 0;
var Response_1 = __importDefault(require("../utils/Response"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret_1 = require("../secret");
var Employee_1 = require("../models/Employee");
var expiresIn = 60 * 60 * 24 * 14 * 1000;
var options = { maxAge: expiresIn, httpOnly: false };
var adminLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, _a, email, password, adminArr, admin, password_matched, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email)
                    return [2 /*return*/, jsonResponse.clientError("Please provide email")];
                if (!password)
                    return [2 /*return*/, jsonResponse.clientError("Please provide password")];
                return [4 /*yield*/, Employee_1.Employees.aggregate([
                        { $match: { email: email, role: "Admin" } },
                        {
                            $lookup: {
                                as: "restaurant",
                                from: "restaurants",
                                foreignField: "restaurant_id",
                                localField: "restaurant_id"
                            },
                        },
                        {
                            $unwind: "$restaurant"
                        },
                    ])];
            case 2:
                adminArr = _b.sent();
                admin = adminArr[0];
                if (!admin)
                    return [2 /*return*/, jsonResponse.clientError("Acount not found")];
                return [4 /*yield*/, bcrypt_1.default.compare(password, admin.password)];
            case 3:
                password_matched = _b.sent();
                if (!password_matched)
                    return [2 /*return*/, jsonResponse.clientError("Invalid password")];
                token = jsonwebtoken_1.default.sign({ user_id: admin.user_id }, secret_1.ADMIN_SECRET, { expiresIn: "10d" });
                res.cookie("session", token, options);
                delete admin.password;
                jsonResponse.success(admin, "Scucessfully logged in");
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.adminLogin = adminLogin;
var employeeLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, _a, email, password, role, employeeArr, employee, password_matched, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password, role = _a.role;
                if (!role)
                    return [2 /*return*/, jsonResponse.clientError("Invalid role")];
                if (!email)
                    return [2 /*return*/, jsonResponse.clientError("Please provide email")];
                if (!password)
                    return [2 /*return*/, jsonResponse.clientError("Please provide password")];
                return [4 /*yield*/, Employee_1.Employees.aggregate([
                        { $match: { email: email, role: role } },
                        {
                            $lookup: {
                                as: "restaurant",
                                from: "restaurants",
                                foreignField: "restaurant_id",
                                localField: "restaurant_id"
                            },
                        },
                        {
                            $unwind: "$restaurant"
                        },
                    ])];
            case 2:
                employeeArr = _b.sent();
                employee = employeeArr[0];
                if (!employee)
                    return [2 /*return*/, jsonResponse.clientError("Acount not found")];
                return [4 /*yield*/, bcrypt_1.default.compare(password, employee.password)];
            case 3:
                password_matched = _b.sent();
                if (!password_matched)
                    return [2 /*return*/, jsonResponse.clientError("Invalid password")];
                token = jsonwebtoken_1.default.sign({ user_id: employee.user_id }, secret_1.EMPLOYEE_SECRET, { expiresIn: "10d" });
                delete employee.password;
                res.cookie("session", token, options);
                jsonResponse.success({ employee: employee, token: token }, "Scucessfully logged in");
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.employeeLogin = employeeLogin;
