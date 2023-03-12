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
exports.retrieveFoodById = exports.retrieveFoods = exports.retrieveCategory = void 0;
var Response_1 = __importDefault(require("../../utils/Response"));
var Food_1 = require("../../models/Food");
var FoodCategory_1 = require("../../models/FoodCategory");
var retrieveCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, categories, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.employee.restaurant_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, FoodCategory_1.FoodCategories.aggregate([
                        {
                            $match: {
                                restaurant_id: restaurant_id
                            }
                        },
                        {
                            $lookup: {
                                from: "foods",
                                localField: "food_category_id",
                                foreignField: "food_category_id",
                                as: "foods"
                            }
                        },
                        {
                            $addFields: {
                                total_items: { $size: "$foods" }
                            }
                        }
                    ])];
            case 2:
                categories = _a.sent();
                jsonResponse.success(categories.map(function (x) {
                    x.is_deletable = x.total_items === 0;
                    return x;
                }));
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.retrieveCategory = retrieveCategory;
var retrieveFoods = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, _a, category, search, matchCreate, foods, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.employee.restaurant_id;
                _a = req.query, category = _a.category, search = _a.search;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                matchCreate = function () {
                    if (category && search)
                        return ({ $match: { restaurant_id: restaurant_id, food_category_id: category, name: { '$regex': search, '$options': "i" } } });
                    if (category)
                        return ({ $match: { restaurant_id: restaurant_id, food_category_id: category } });
                    if (search)
                        return ({ $match: { restaurant_id: restaurant_id, name: { '$regex': search, '$options': "i" } } });
                    return ({ $match: { restaurant_id: restaurant_id } });
                };
                return [4 /*yield*/, Food_1.Foods.aggregate([
                        matchCreate(),
                        {
                            $lookup: {
                                as: "category_data",
                                from: "food_categories",
                                localField: "food_category_id",
                                foreignField: "food_category_id"
                            }
                        },
                        {
                            $unwind: {
                                path: "$category_data",
                                preserveNullAndEmptyArrays: false
                            }
                        },
                        {
                            $addFields: {
                                category_name: "$category_data.name"
                            }
                        },
                        {
                            $project: {
                                category_data: 0
                            }
                        }
                    ])];
            case 2:
                foods = _b.sent();
                jsonResponse.success(foods);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.retrieveFoods = retrieveFoods;
var retrieveFoodById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, food_id, foods, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.employee.restaurant_id;
                food_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Food_1.Foods.aggregate([
                        {
                            $match: {
                                restaurant_id: restaurant_id,
                                food_id: food_id
                            }
                        },
                        {
                            $lookup: {
                                as: "category_data",
                                from: "food_categories",
                                localField: "food_category_id",
                                foreignField: "food_category_id"
                            }
                        },
                        {
                            $unwind: "$category_data"
                        },
                        {
                            $addFields: {
                                category_name: "$category_data.name"
                            }
                        }
                    ])];
            case 2:
                foods = _a.sent();
                if (foods.length === 0)
                    return [2 /*return*/, jsonResponse.notFound("Food item not found")];
                jsonResponse.success(foods[0]);
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
exports.retrieveFoodById = retrieveFoodById;
