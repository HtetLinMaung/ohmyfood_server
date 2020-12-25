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
        while (_) try {
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
var User_1 = __importDefault(require("../../models/User"));
var validator_1 = __importDefault(require("validator"));
var CategoryType_1 = __importDefault(require("../../models/CategoryType"));
var Category_1 = __importDefault(require("../../models/Category"));
exports.default = {
    categoryTypes: function (_a, req) {
        var page = _a.page, perPage = _a.perPage;
        return __awaiter(void 0, void 0, void 0, function () {
            var error, categoryTypes, totalRows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!req.isAuth) {
                            error = new Error("Not Authenticated!");
                            error.code = 401;
                            throw error;
                        }
                        return [4 /*yield*/, CategoryType_1.default
                                .findWithoutDeleted()
                                .countDocuments()];
                    case 1:
                        totalRows = _b.sent();
                        if (!(!page || !perPage)) return [3 /*break*/, 3];
                        return [4 /*yield*/, CategoryType_1.default.findWithoutDeleted({}, "categories")];
                    case 2:
                        categoryTypes = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, CategoryType_1.default
                            .findWithoutDeleted({}, "categories")
                            .skip((page - 1) * perPage)
                            .limit(perPage)];
                    case 4:
                        categoryTypes = _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/, {
                            page: page,
                            perPage: perPage,
                            totalRows: totalRows,
                            categoryTypes: categoryTypes.map(function (categoryType) {
                                var _a;
                                return (__assign(__assign({}, categoryType._doc), { createdAt: categoryType.createdAt.toISOString(), updatedAt: categoryType.updatedAt.toISOString(), deletedAt: (_a = categoryType.deletedAt) === null || _a === void 0 ? void 0 : _a.toISOString(), categories: categoryType.categories.map(function (category) { return (__assign(__assign({}, category._doc), { openHour: category.availableTime.openHour, closeHour: category.availableTime.closeHour })); }) }));
                            }),
                        }];
                }
            });
        });
    },
    categoryType: function (_a, req) {
        var id = _a.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var error, categoryType, error;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!req.isAuth) {
                            error = new Error("Not Authenticated!");
                            error.code = 401;
                            throw error;
                        }
                        return [4 /*yield*/, CategoryType_1.default.findOneWithoutDeleted({ _id: id }, "categories")];
                    case 1:
                        categoryType = _c.sent();
                        if (!categoryType) {
                            error = new Error("Category Type not found!");
                            error.code = 404;
                            throw error;
                        }
                        return [2 /*return*/, __assign(__assign({}, categoryType._doc), { createdAt: categoryType.createdAt.toISOString(), updatedAt: categoryType.updatedAt.toISOString(), deletedAt: (_b = categoryType.deletedAt) === null || _b === void 0 ? void 0 : _b.toISOString(), categories: categoryType.categories.map(function (category) { return (__assign(__assign({}, category._doc), { openHour: category.availableTime.openHour, closeHour: category.availableTime.closeHour })); }) })];
                }
            });
        });
    },
    createCategoryType: function (_a, req) {
        var categoryTypeInput = _a.categoryTypeInput;
        return __awaiter(void 0, void 0, void 0, function () {
            var error, user, error, errors, error, categoryType;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!req.isAuth) {
                            error = new Error("Not Authenticated!");
                            error.code = 401;
                            throw error;
                        }
                        return [4 /*yield*/, User_1.default.findById(req.userId)];
                    case 1:
                        user = (_c.sent());
                        if (user.role == "customer") {
                            error = new Error("Unauthorized!");
                            error.code = 401;
                            throw error;
                        }
                        errors = getValidationResults(categoryTypeInput);
                        if (errors.length > 0) {
                            error = new Error("Invalid input!");
                            error.code = 422;
                            error.data = errors;
                            throw error;
                        }
                        categoryType = new CategoryType_1.default(categoryTypeInput);
                        return [4 /*yield*/, categoryType.save()];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, Category_1.default.updateMany({ _id: { $in: categoryType.categories } }, { $push: { types: categoryType._id } })];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, __assign(__assign({}, categoryType._doc), { createdAt: categoryType.createdAt.toISOString(), updatedAt: categoryType.updatedAt.toISOString(), deletedAt: (_b = categoryType.deletedAt) === null || _b === void 0 ? void 0 : _b.toISOString() })];
                }
            });
        });
    },
    updateCategoryType: function (_a, req) {
        var id = _a.id, categoryTypeInput = _a.categoryTypeInput;
        return __awaiter(void 0, void 0, void 0, function () {
            var error, user, error, errors, error, categoryType, error;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!req.isAuth) {
                            error = new Error("Not Authenticated!");
                            error.code = 401;
                            throw error;
                        }
                        return [4 /*yield*/, User_1.default.findById(req.userId)];
                    case 1:
                        user = (_c.sent());
                        if (user.role == "customer") {
                            error = new Error("Unauthorized!");
                            error.code = 401;
                            throw error;
                        }
                        errors = getValidationResults(categoryTypeInput);
                        if (errors.length > 0) {
                            error = new Error("Invalid input!");
                            error.code = 422;
                            error.data = errors;
                            throw error;
                        }
                        return [4 /*yield*/, CategoryType_1.default.findById(id)];
                    case 2:
                        categoryType = _c.sent();
                        if (!categoryType) {
                            error = new Error("Category Type not found!");
                            error.code = 404;
                            throw error;
                        }
                        categoryType.name = categoryTypeInput.name;
                        categoryType.imageUrl = categoryTypeInput.imageUrl;
                        categoryType.include = categoryTypeInput.include;
                        categoryType.categories = categoryTypeInput.categories;
                        return [4 /*yield*/, categoryType.save()];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, Category_1.default.updateMany({}, { $pull: { types: id } })];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, Category_1.default.updateMany({ _id: { $in: categoryType.categories } }, { $push: { types: id } })];
                    case 5:
                        _c.sent();
                        return [2 /*return*/, __assign(__assign({}, categoryType._doc), { createdAt: categoryType.createdAt.toISOString(), updatedAt: categoryType.updatedAt.toISOString(), deletedAt: (_b = categoryType.deletedAt) === null || _b === void 0 ? void 0 : _b.toISOString() })];
                }
            });
        });
    },
    deleteCategoryType: function (_a, req) {
        var id = _a.id, permanent = _a.permanent;
        return __awaiter(void 0, void 0, void 0, function () {
            var error, user, error, categoryType;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!req.isAuth) {
                            error = new Error("Not Authenticated!");
                            error.code = 401;
                            throw error;
                        }
                        return [4 /*yield*/, User_1.default.findById(req.userId)];
                    case 1:
                        user = (_b.sent());
                        if (user.role == "customer") {
                            error = new Error("Unauthorized!");
                            error.code = 401;
                            throw error;
                        }
                        categoryType = CategoryType_1.default.findById(id);
                        if (!categoryType) {
                            return [2 /*return*/, false];
                        }
                        if (!permanent) return [3 /*break*/, 3];
                        return [4 /*yield*/, CategoryType_1.default.findByIdAndDelete(id)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, CategoryType_1.default.softDeleteById(id)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/, true];
                }
            });
        });
    },
};
var getValidationResults = function (categoryTypeInput) {
    var errors = [];
    if (validator_1.default.isEmpty(categoryTypeInput.name)) {
        errors.push("name is invalid!");
    }
    if (validator_1.default.isEmpty(categoryTypeInput.imageUrl)) {
        errors.push("imageUrl is invalid!");
    }
    if (!validator_1.default.isBoolean(categoryTypeInput.include.toString())) {
        errors.push("include is invalid!");
    }
    if (!Array.isArray(categoryTypeInput.categories) ||
        (categoryTypeInput.categories.length > 0 &&
            !categoryTypeInput.categories.every(function (v) { return typeof v == "string"; }))) {
        errors.push({ message: "Categories are invalid!" });
    }
    return errors;
};
//# sourceMappingURL=categoryTypeResolver.js.map