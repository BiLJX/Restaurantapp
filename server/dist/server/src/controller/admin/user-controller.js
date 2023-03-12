"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deleteEmployee = exports.editEmployee = exports.retrieveEmployeeById = exports.retrieveEmployee = exports.createEmployee = exports.getCurrentAdmin = void 0;
var Employee_1 = require("../../models/Employee");
var idgen_1 = require("../../utils/idgen");
var upload_1 = require("../../utils/upload");
var sharp_1 = __importDefault(require("sharp"));
var Response_1 = __importDefault(require("../../utils/Response"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var validator_1 = require("../../utils/validator");
var getCurrentAdmin = function (req, res) {
    var jsonResponse = new Response_1.default(res);
    try {
        jsonResponse.success(res.locals.admin);
    }
    catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
};
exports.getCurrentAdmin = getCurrentAdmin;
var createEmployee = function (req, res) {
    var restaurant_id = res.locals.admin.restaurant_id;
    (0, upload_1.upload)(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
        var jsonResponse, datas, files, pfp_image, user_id, nameValidation, emailValidation, genderValidation, passwordValidation, contact_noValidation, roleValidation, salt, password, employee, buffer, image_url, data, _data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jsonResponse = new Response_1.default(res);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    if (err) {
                        console.log(err);
                        return [2 /*return*/, jsonResponse.serverError()];
                    }
                    datas = req.body;
                    files = req.files;
                    pfp_image = files[0];
                    if (!pfp_image)
                        return [2 /*return*/, jsonResponse.clientError("Please upload a profile picture")];
                    user_id = (0, idgen_1.makeId)();
                    if (!pfp_image.mimetype.includes("image"))
                        return [2 /*return*/, jsonResponse.clientError("Invalid image type.")];
                    nameValidation = (0, validator_1.validateFullName)(datas.full_name);
                    emailValidation = (0, validator_1.validateEmail)(datas.email);
                    genderValidation = (0, validator_1.validateGender)(datas.gender);
                    passwordValidation = (0, validator_1.validatePassowrd)(datas.password);
                    datas.contact_no = parseInt(datas.contact_no);
                    contact_noValidation = (0, validator_1.validateContactNo)(datas.contact_no);
                    roleValidation = (0, validator_1.validateRoles)(datas.role);
                    if (!nameValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(nameValidation.message)];
                    if (!emailValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(emailValidation.message)];
                    if (!genderValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(genderValidation.message)];
                    if (!passwordValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(passwordValidation.message)];
                    if (!contact_noValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(contact_noValidation.message)];
                    if (!roleValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(roleValidation.message)];
                    return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 2:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(datas.password.trim(), salt)];
                case 3:
                    password = _a.sent();
                    employee = new Employee_1.Employees(__assign(__assign({}, datas), { user_id: user_id, restaurant_id: restaurant_id, profile_pic_url: "", password: password }));
                    return [4 /*yield*/, (0, sharp_1.default)(pfp_image.buffer).jpeg({ quality: 90 }).toBuffer()];
                case 4:
                    buffer = _a.sent();
                    return [4 /*yield*/, (0, upload_1.uploadFile)({ buffer: buffer, dir: "restaurant/".concat(restaurant_id, "/user/").concat(user_id, "/pfp/").concat(user_id, "/") })];
                case 5:
                    image_url = _a.sent();
                    employee.profile_pic_url = image_url;
                    return [4 /*yield*/, employee.save()];
                case 6:
                    data = _a.sent();
                    _data = data.toJSON();
                    delete _data.password;
                    jsonResponse.success(_data);
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.log(error_1);
                    jsonResponse.serverError();
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
};
exports.createEmployee = createEmployee;
var retrieveEmployee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, search_query, matchCreate, employees, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.admin.restaurant_id;
                search_query = req.query.search_query;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                matchCreate = function () {
                    if (search_query)
                        return ({
                            $match: {
                                restaurant_id: restaurant_id,
                                full_name: { $regex: search_query, $options: "i" }
                            }
                        });
                    return ({
                        $match: {
                            restaurant_id: restaurant_id
                        }
                    });
                };
                return [4 /*yield*/, Employee_1.Employees.aggregate([
                        matchCreate(),
                        {
                            $project: {
                                password: 0
                            }
                        }
                    ])];
            case 2:
                employees = _a.sent();
                jsonResponse.success(employees);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.retrieveEmployee = retrieveEmployee;
var retrieveEmployeeById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, id, employee, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.admin.restaurant_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, Employee_1.Employees.aggregate([
                        {
                            $match: {
                                restaurant_id: restaurant_id,
                                user_id: id
                            }
                        },
                        {
                            $project: {
                                password: 0
                            }
                        }
                    ])];
            case 2:
                employee = _a.sent();
                if (!employee[0])
                    return [2 /*return*/, jsonResponse.notFound("Employee not found")];
                jsonResponse.success(employee[0]);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.retrieveEmployeeById = retrieveEmployeeById;
var editEmployee = function (req, res) {
    var restaurant_id = res.locals.admin.restaurant_id;
    (0, upload_1.upload)(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
        var jsonResponse, datas, files, pfp_image, nameValidation, emailValidation, genderValidation, contact_noValidation, roleValidation, employee, buffer, image_url, _employee, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jsonResponse = new Response_1.default(res);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    if (err) {
                        console.log(err);
                        return [2 /*return*/, jsonResponse.serverError()];
                    }
                    datas = req.body;
                    files = req.files;
                    pfp_image = files[0];
                    datas.contact_no = parseInt(datas.contact_no);
                    nameValidation = (0, validator_1.validateFullName)(datas.full_name);
                    emailValidation = (0, validator_1.validateEmail)(datas.email);
                    genderValidation = (0, validator_1.validateGender)(datas.gender);
                    contact_noValidation = (0, validator_1.validateContactNo)(datas.contact_no);
                    roleValidation = (0, validator_1.validateRoles)(datas.role);
                    if (!nameValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(nameValidation.message)];
                    if (!emailValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(emailValidation.message)];
                    if (!genderValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(genderValidation.message)];
                    if (!contact_noValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(contact_noValidation.message)];
                    if (!roleValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(roleValidation.message)];
                    return [4 /*yield*/, Employee_1.Employees.findOneAndUpdate({ user_id: datas.user_id, restaurant_id: restaurant_id }, {
                            $set: __assign({}, datas)
                        })];
                case 2:
                    employee = _a.sent();
                    if (!employee)
                        return [2 /*return*/, jsonResponse.clientError("User not found")];
                    if (!pfp_image) return [3 /*break*/, 6];
                    if (!pfp_image.mimetype.includes("image"))
                        return [2 /*return*/, jsonResponse.clientError("Invalid image type.")];
                    return [4 /*yield*/, (0, sharp_1.default)(pfp_image.buffer).jpeg({ quality: 90 }).toBuffer()];
                case 3:
                    buffer = _a.sent();
                    return [4 /*yield*/, (0, upload_1.uploadFile)({ buffer: buffer, dir: "restaurant/".concat(restaurant_id, "/user/").concat(datas.user_id, "/pfp/").concat(datas.user_id, "/") })];
                case 4:
                    image_url = _a.sent();
                    return [4 /*yield*/, Employee_1.Employees.findOneAndUpdate({ user_id: datas.user_id, restaurant_id: restaurant_id }, {
                            $set: {
                                profile_pic_url: image_url
                            }
                        })];
                case 5:
                    employee = _a.sent();
                    _a.label = 6;
                case 6:
                    _employee = employee === null || employee === void 0 ? void 0 : employee.toJSON();
                    delete _employee.password;
                    jsonResponse.success(_employee);
                    return [3 /*break*/, 8];
                case 7:
                    error_4 = _a.sent();
                    console.log(error_4);
                    jsonResponse.serverError();
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
};
exports.editEmployee = editEmployee;
var deleteEmployee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, id, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.admin.restaurant_id;
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Employee_1.Employees.findOneAndDelete({ restaurant_id: restaurant_id, user_id: id })];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, upload_1.removeFile)("restaurant/".concat(restaurant_id, "/user/").concat(id, "/"))];
            case 3:
                _a.sent();
                jsonResponse.success();
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.log(error_5);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteEmployee = deleteEmployee;
