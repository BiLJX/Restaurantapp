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
exports.billPaid = exports.retrieveBill = exports.retrieveOrders = void 0;
var SalesLog_1 = require("../../models/SalesLog");
var idgen_1 = require("../../utils/idgen");
var Order_1 = require("../../models/Order");
var Response_1 = __importDefault(require("../../utils/Response"));
var OrderLogs_1 = require("../../models/OrderLogs");
var retrieveOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, _a, status_1, seat_id_1, restaurant_id_1, find, orders, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = req.query, status_1 = _a.status, seat_id_1 = _a.seat_id;
                restaurant_id_1 = res.locals.employee.restaurant_id;
                find = function () {
                    if (status_1 && seat_id_1)
                        return { restaurant_id: restaurant_id_1, status: status_1, seat_id: seat_id_1 };
                    if (status_1)
                        return { restaurant_id: restaurant_id_1, status: status_1 };
                    if (seat_id_1)
                        return { restaurant_id: restaurant_id_1, seat_id: seat_id_1 };
                    return { restaurant_id: restaurant_id_1 };
                };
                return [4 /*yield*/, Order_1.Orders.aggregate([
                        {
                            $match: find()
                        },
                        {
                            $lookup: {
                                as: "food",
                                from: "foods",
                                foreignField: "food_id",
                                localField: "food_id"
                            }
                        },
                        {
                            $lookup: {
                                as: "seat_data",
                                from: "seats",
                                foreignField: "seat_id",
                                localField: "seat_id"
                            }
                        },
                        {
                            $unwind: "$food"
                        },
                        {
                            $unwind: "$seat_data"
                        },
                        {
                            $addFields: {
                                seat_name: "$seat_data.seat_name"
                            }
                        },
                        {
                            $project: {
                                seat_data: 0
                            }
                        }
                    ])];
            case 2:
                orders = _b.sent();
                jsonResponse.success(orders);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.retrieveOrders = retrieveOrders;
var retrieveBill = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, seat_id, orders, bill, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.employee.restaurant_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                seat_id = req.params.seat_id;
                return [4 /*yield*/, Order_1.Orders.find({ seat_id: seat_id, restaurant_id: restaurant_id }).populate("food")];
            case 2:
                orders = _a.sent();
                bill = {
                    total_price: orders.reduce(function (total, order) { return total + (order.quantity * order.food.price); }, 0),
                    orders: orders
                };
                jsonResponse.success(bill);
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
exports.retrieveBill = retrieveBill;
var billPaid = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, io, seat_id, orders, total_price, order_log_data, sales_log, error_3, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.employee.restaurant_id;
                io = req.app.locals.io;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                seat_id = req.params.seat_id;
                return [4 /*yield*/, Order_1.Orders.find({ seat_id: seat_id, restaurant_id: restaurant_id }).populate("food")];
            case 2:
                orders = _a.sent();
                total_price = orders.reduce(function (total, order) { return total + (order.quantity * order.food.price); }, 0);
                return [4 /*yield*/, Order_1.Orders.deleteMany({ seat_id: seat_id })];
            case 3:
                _a.sent();
                io.to(restaurant_id).emit("order:paid", { seat_id: seat_id });
                jsonResponse.success();
                _a.label = 4;
            case 4:
                _a.trys.push([4, 7, , 8]);
                order_log_data = orders.map(function (x) { return ({
                    restaurant_id: restaurant_id,
                    log_id: (0, idgen_1.makeId)(),
                    createdAt: new Date(),
                    food_id: x.food_id,
                    amount: x.food.price
                }); });
                sales_log = new SalesLog_1.SalesLog({
                    log_id: (0, idgen_1.makeId)(),
                    restaurant_id: restaurant_id,
                    amount: total_price
                });
                return [4 /*yield*/, sales_log.save()];
            case 5:
                _a.sent();
                return [4 /*yield*/, OrderLogs_1.OrderLog.insertMany(order_log_data)];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_4 = _a.sent();
                console.log(error_4);
                jsonResponse.serverError();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.billPaid = billPaid;
