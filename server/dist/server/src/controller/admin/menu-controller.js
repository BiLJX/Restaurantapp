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
exports.deleteFood = exports.editFood = exports.retrieveFoodById = exports.retrieveFoods = exports.createFood = exports.deleteCategory = exports.editCategory = exports.retrieveCategory = exports.createCategory = void 0;
var Response_1 = __importDefault(require("../../utils/Response"));
var FoodCategory_1 = require("../../models/FoodCategory");
var idgen_1 = require("../../utils/idgen");
var Food_1 = require("../../models/Food");
var upload_1 = require("../../utils/upload");
var sharp_1 = __importDefault(require("sharp"));
//category
var createCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, admin, name_1, category, newCat, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                admin = res.locals.admin;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                name_1 = req.body.name;
                if (!name_1)
                    return [2 /*return*/, jsonResponse.clientError("Please enter name")];
                category = new FoodCategory_1.FoodCategories({
                    name: name_1,
                    food_category_id: (0, idgen_1.makeId)(),
                    restaurant_id: admin.restaurant_id
                });
                return [4 /*yield*/, category.save()];
            case 2:
                _a.sent();
                newCat = category.toJSON();
                newCat.is_deletable = true;
                newCat.total_items = 0;
                jsonResponse.success(newCat);
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
exports.createCategory = createCategory;
var retrieveCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, admin, categories, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                admin = res.locals.admin;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, FoodCategory_1.FoodCategories.aggregate([
                        {
                            $match: {
                                restaurant_id: admin.restaurant_id
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
                error_2 = _a.sent();
                console.log(error_2);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.retrieveCategory = retrieveCategory;
var editCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, _a, name_2, food_category_id, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.admin.restaurant_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = req.body, name_2 = _a.name, food_category_id = _a.food_category_id;
                if (!food_category_id)
                    return [2 /*return*/, jsonResponse.clientError("Please choose category to edit")];
                if (!name_2)
                    return [2 /*return*/, jsonResponse.clientError("Please enter name")];
                return [4 /*yield*/, FoodCategory_1.FoodCategories.findOneAndUpdate({ restaurant_id: restaurant_id, food_category_id: food_category_id }, {
                        $set: {
                            name: name_2
                        }
                    })];
            case 2:
                _b.sent();
                jsonResponse.success();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.log(error_3);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.editCategory = editCategory;
var deleteCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, food_category_id, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.admin.restaurant_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                food_category_id = req.params.id;
                if (!food_category_id)
                    return [2 /*return*/, jsonResponse.clientError("Please select category to delete")];
                return [4 /*yield*/, FoodCategory_1.FoodCategories.findOneAndDelete({ restaurant_id: restaurant_id, food_category_id: food_category_id })];
            case 2:
                _a.sent();
                jsonResponse.success();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteCategory = deleteCategory;
//food
var createFood = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurant_id;
    return __generator(this, function (_a) {
        restaurant_id = res.locals.admin.restaurant_id;
        (0, upload_1.upload)(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
            var jsonResponse, client_data, files, image, category, buffer, food_id, image_url, food, _food, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonResponse = new Response_1.default(res);
                        if (err) {
                            console.log(err);
                            return [2 /*return*/, jsonResponse.serverError()];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        client_data = req.body;
                        files = req.files;
                        if (!files)
                            return [2 /*return*/, jsonResponse.clientError("Please upload a image")];
                        image = files[0];
                        if (!image)
                            return [2 /*return*/, jsonResponse.clientError("Please upload a image")];
                        if (!client_data.name)
                            return [2 /*return*/, jsonResponse.clientError("Enter name")];
                        if (client_data.name.length > 20)
                            return [2 /*return*/, jsonResponse.clientError("Name can't be more than 20 charecters")];
                        if (client_data.description.length > 150)
                            return [2 /*return*/, jsonResponse.clientError("Desacription cant be more than 150 charecters")];
                        if (!image.mimetype.includes("image"))
                            return [2 /*return*/, jsonResponse.clientError("Unsupported image type.")];
                        return [4 /*yield*/, FoodCategory_1.FoodCategories.findOne({ restaurant_id: restaurant_id, food_category_id: client_data.food_category_id })];
                    case 2:
                        category = _a.sent();
                        if (!category)
                            return [2 /*return*/, jsonResponse.clientError("Category not found")];
                        return [4 /*yield*/, (0, sharp_1.default)(image.buffer).jpeg({ quality: 90 }).toBuffer()];
                    case 3:
                        buffer = _a.sent();
                        food_id = (0, idgen_1.makeId)();
                        return [4 /*yield*/, (0, upload_1.uploadFile)({ buffer: buffer, dir: "restaurant/".concat(restaurant_id, "/foods/").concat(food_id, "/") })];
                    case 4:
                        image_url = _a.sent();
                        food = new Food_1.Foods(__assign(__assign({}, client_data), { restaurant_id: restaurant_id, food_id: food_id, image_url: image_url }));
                        return [4 /*yield*/, food.save()];
                    case 5:
                        _a.sent();
                        _food = food.toJSON();
                        _food.category_name = category.name;
                        jsonResponse.success(food);
                        return [3 /*break*/, 7];
                    case 6:
                        error_5 = _a.sent();
                        console.log(error_5);
                        jsonResponse.serverError();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.createFood = createFood;
var retrieveFoods = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, _a, category, search, matchCreate, foods, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.admin.restaurant_id;
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
                error_6 = _b.sent();
                console.log(error_6);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.retrieveFoods = retrieveFoods;
var retrieveFoodById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, food_id, foods, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.admin.restaurant_id;
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
                error_7 = _a.sent();
                console.log(error_7);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.retrieveFoodById = retrieveFoodById;
var editFood = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurant_id;
    return __generator(this, function (_a) {
        restaurant_id = res.locals.admin.restaurant_id;
        (0, upload_1.upload)(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
            var jsonResponse, client_data, files, food, old_food, category, image, buffer, image_url, _food, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonResponse = new Response_1.default(res);
                        if (err) {
                            console.log(err);
                            return [2 /*return*/, jsonResponse.serverError()];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        client_data = req.body;
                        delete client_data.image_url;
                        files = req.files;
                        food = void 0;
                        return [4 /*yield*/, Food_1.Foods.findOne({ food_id: client_data.food_id })];
                    case 2:
                        old_food = _a.sent();
                        if (!old_food)
                            return [2 /*return*/, jsonResponse.clientError("Food not found")];
                        if (!client_data.name)
                            return [2 /*return*/, jsonResponse.clientError("Enter name")];
                        if (client_data.name.length > 20)
                            return [2 /*return*/, jsonResponse.clientError("Name can't be more than 20 charecters")];
                        if (client_data.description.length > 150)
                            return [2 /*return*/, jsonResponse.clientError("Desacription cant be more than 150 charecters")];
                        return [4 /*yield*/, FoodCategory_1.FoodCategories.findOne({ restaurant_id: restaurant_id, food_category_id: client_data.food_category_id })];
                    case 3:
                        category = _a.sent();
                        if (!category)
                            return [2 /*return*/, jsonResponse.clientError("Category not found")];
                        return [4 /*yield*/, Food_1.Foods.findOneAndUpdate({ food_id: client_data.food_id }, {
                                $set: __assign(__assign({}, client_data), { image_url: old_food.image_url })
                            })];
                    case 4:
                        food = _a.sent();
                        if (!files[0]) return [3 /*break*/, 8];
                        image = files[0];
                        if (!image.mimetype.includes("image"))
                            return [2 /*return*/, jsonResponse.clientError("Unsupported image type.")];
                        return [4 /*yield*/, (0, sharp_1.default)(image.buffer).jpeg({ quality: 90 }).toBuffer()];
                    case 5:
                        buffer = _a.sent();
                        return [4 /*yield*/, (0, upload_1.uploadFile)({ buffer: buffer, dir: "restaurant/".concat(restaurant_id, "/foods/").concat(old_food.food_id, "/") })];
                    case 6:
                        image_url = _a.sent();
                        return [4 /*yield*/, Food_1.Foods.findOneAndUpdate({ food_id: client_data.food_id }, {
                                $set: {
                                    image_url: image_url
                                }
                            })];
                    case 7:
                        food = _a.sent();
                        _a.label = 8;
                    case 8:
                        _food = food.toJSON();
                        _food.category_name = category.name;
                        jsonResponse.success(food);
                        return [3 /*break*/, 10];
                    case 9:
                        error_8 = _a.sent();
                        console.log(error_8);
                        jsonResponse.serverError();
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.editFood = editFood;
var deleteFood = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, food_id, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.admin.restaurant_id;
                food_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Food_1.Foods.findOneAndDelete({ restaurant_id: restaurant_id, food_id: food_id })];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, upload_1.removeFile)("restaurant/".concat(restaurant_id, "/foods/").concat(food_id, "/"))];
            case 3:
                _a.sent();
                jsonResponse.success();
                return [3 /*break*/, 5];
            case 4:
                error_9 = _a.sent();
                console.log(error_9);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteFood = deleteFood;
