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
Object.defineProperty(exports, "__esModule", { value: true });
var Order_1 = require("../models/Order");
var idgen_1 = require("../utils/idgen");
function orderHandler(socket, io) {
    var _this = this;
    var createOrder = function (order_client) { return __awaiter(_this, void 0, void 0, function () {
        var order_id_1, order_item, orders, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    order_id_1 = (0, idgen_1.makeId)();
                    order_item = order_client.foods.map(function (x) {
                        return {
                            order_item_id: (0, idgen_1.makeId)(),
                            order_id: order_id_1,
                            food_id: x.food_id,
                            seat_id: order_client.seat_id,
                            quantity: x.quantity,
                            order_by: socket.user_id,
                            restaurant_id: socket.restaurant_id,
                            status: "Pending",
                            seat_name: "",
                            food: {}
                        };
                    });
                    return [4 /*yield*/, Order_1.Orders.insertMany(order_item)];
                case 1:
                    _a.sent();
                    console.log("".concat(socket.restaurant_id, ":Chef"));
                    return [4 /*yield*/, Order_1.Orders.aggregate([
                            { $match: { order_id: order_id_1 } },
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
                    orders = _a.sent();
                    io.to("".concat(socket.restaurant_id, ":Chef")).emit("order:new", orders);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    io.to(socket.user_id).emit("Error", { msg: "Error something went wrong :(" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var deleteOrderItem = function (_a) {
        var order_item_id = _a.order_item_id;
        return __awaiter(_this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Order_1.Orders.deleteOne({ order_item_id: order_item_id })];
                    case 1:
                        _b.sent();
                        io.to(socket.restaurant_id).emit("order-item:cancel", { order_item_id: order_item_id });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        io.to(socket.user_id).emit("Error", { msg: "Error something went wrong :(" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var onStatusChange = function (_a) {
        var status = _a.status, order_item_id = _a.order_item_id;
        return __awaiter(_this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Order_1.Orders.findOneAndUpdate({ order_item_id: order_item_id }, {
                                $set: {
                                    status: status
                                }
                            })];
                    case 1:
                        _b.sent();
                        socket.broadcast.to(socket.restaurant_id).emit("order-item:status", { order_item_id: order_item_id, status: status });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        io.to(socket.user_id).emit("Error", { msg: "Error something went wrong :(" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var onPaid = function (_a) {
        var seat_id = _a.seat_id;
        return __awaiter(_this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Order_1.Orders.deleteMany({ seat_id: seat_id })];
                    case 1:
                        _b.sent();
                        io.to(socket.restaurant_id).emit("order:paid", { seat_id: seat_id });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        io.to(socket.user_id).emit("Error", { msg: "Error something went wrong :(" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    socket.on("order-item:status", onStatusChange);
    socket.on("order:create", createOrder);
    socket.on("order-item:cancel", deleteOrderItem);
    socket.on("order:paid", onPaid);
}
exports.default = orderHandler;
