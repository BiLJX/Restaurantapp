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
exports.retrieveDashboard = void 0;
var Restaurant_1 = require("../../models/Restaurant");
var Response_1 = __importDefault(require("../../utils/Response"));
var query_1 = require("../../utils/query");
var SalesLog_1 = require("../../models/SalesLog");
var OrderLogs_1 = require("../../models/OrderLogs");
var moment_1 = __importDefault(require("moment"));
var retrieveDashboard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, restaurant_id, data1, revenue, orders, data, error_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                restaurant_id = res.locals.admin.restaurant_id;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 5, , 6]);
                return [4 /*yield*/, Restaurant_1.Restaurants.aggregate([
                        {
                            $match: { restaurant_id: restaurant_id }
                        },
                        {
                            $lookup: {
                                from: "order_logs",
                                as: "order_logs",
                                localField: "restaurant_id",
                                foreignField: "restaurant_id",
                                pipeline: [
                                    {
                                        $lookup: {
                                            from: "foods",
                                            as: "food",
                                            localField: "food_id",
                                            foreignField: "food_id"
                                        }
                                    },
                                    {
                                        $unwind: {
                                            preserveNullAndEmptyArrays: true,
                                            path: "$food"
                                        }
                                    },
                                    {
                                        $group: {
                                            _id: "$food.name",
                                            count: { $sum: 1 }
                                        }
                                    },
                                    {
                                        $sort: {
                                            count: -1
                                        }
                                    },
                                    {
                                        $limit: 3
                                    }
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: "sales_logs",
                                as: "sales_logs",
                                localField: "restaurant_id",
                                foreignField: "restaurant_id",
                                pipeline: [
                                    {
                                        $match: {
                                            createdAt: (0, query_1.getToday)()
                                        }
                                    },
                                    {
                                        $group: {
                                            _id: null,
                                            total_sales: {
                                                $sum: "$amount"
                                            },
                                            count: { $sum: 1 }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: "sales_logs",
                                as: "sales_logs_month",
                                localField: "restaurant_id",
                                foreignField: "restaurant_id",
                                pipeline: [
                                    {
                                        $match: {
                                            createdAt: (0, query_1.getLastDays)(30)
                                        }
                                    },
                                    {
                                        $group: {
                                            _id: null,
                                            total_sales: {
                                                $sum: "$amount"
                                            },
                                            count: { $sum: 1 }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $unwind: {
                                path: "$sales_logs",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$sales_logs_month",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $lookup: {
                                from: "employees",
                                as: "employees",
                                localField: "restaurant_id",
                                foreignField: "restaurant_id"
                            }
                        },
                        {
                            $addFields: {
                                employees_count: { $size: "$employees" }
                            }
                        }
                    ])];
            case 2:
                data1 = (_d.sent())[0];
                return [4 /*yield*/, SalesLog_1.SalesLog.aggregate([
                        {
                            $match: {
                                restaurant_id: restaurant_id,
                                createdAt: (0, query_1.getLastDays)(14)
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    day: { $dayOfMonth: "$createdAt" },
                                    month: { $month: "$createdAt" }
                                },
                                total_sales: { $sum: "$amount" }
                            }
                        }
                    ])];
            case 3:
                revenue = _d.sent();
                return [4 /*yield*/, OrderLogs_1.OrderLog.aggregate([
                        {
                            $match: {
                                restaurant_id: restaurant_id,
                                createdAt: (0, query_1.getLastDays)(14)
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    day: { $dayOfMonth: "$createdAt" },
                                    month: { $month: "$createdAt" }
                                },
                                total_orders: { $sum: 1 }
                            }
                        }
                    ])];
            case 4:
                orders = _d.sent();
                data = {
                    dash_board_overview: {
                        total_employees_count: data1.employees_count || 0,
                        total_orders_count: ((_a = data1.sales_logs) === null || _a === void 0 ? void 0 : _a.count) || 0,
                        total_revenue_count: ((_b = data1.sales_logs) === null || _b === void 0 ? void 0 : _b.total_sales) || 0,
                        total_revenue_month_count: ((_c = data1.sales_logs_month) === null || _c === void 0 ? void 0 : _c.total_sales) || 0
                    },
                    orders: {
                        data: orders.map(function (x) { return x.total_orders; }),
                        labels: orders.map(function (x) { return "".concat((0, moment_1.default)(x._id.month.toString(), 'MM').format("MMM"), " ").concat(x._id.day); }),
                        // data: [5, 8, 10, 8, 2, 4, 6, 7],
                        // labels: ["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7", "Jan 8"]
                    },
                    revenue: {
                        data: revenue.map(function (x) { return x.total_sales; }),
                        labels: orders.map(function (x) { return "".concat((0, moment_1.default)(x._id.month.toString(), 'MM').format("MMM"), " ").concat(x._id.day); }),
                        // data: [500, 844, 1022, 811, 200, 400, 600, 700],
                        // labels: ["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7", "Jan 8"]
                    },
                    sales_by_food: {
                        data: data1.order_logs.map(function (x) { return x.count; }),
                        labels: data1.order_logs.map(function (x) { return x._id; })
                    }
                };
                jsonResponse.success(data);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _d.sent();
                console.log(error_1);
                jsonResponse.serverError();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.retrieveDashboard = retrieveDashboard;
