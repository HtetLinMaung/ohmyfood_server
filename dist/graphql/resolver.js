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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authResolver_1 = __importDefault(require("./resolvers/authResolver"));
var categoryResolver_1 = __importDefault(require("./resolvers/categoryResolver"));
var categoryTypeResolver_1 = __importDefault(require("./resolvers/categoryTypeResolver"));
exports.default = __assign(__assign(__assign({}, authResolver_1.default), categoryResolver_1.default), categoryTypeResolver_1.default);
//# sourceMappingURL=resolver.js.map