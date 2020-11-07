"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (function (req, _, next) {
    req.isAuth = true;
    var header = req.get("Authorization");
    if (!header) {
        req.isAuth = false;
        return next();
    }
    var token = header.split(" ")[1];
    var decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET || "secret");
    }
    catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.userId = decodedToken.userId;
    req.isAuth = true;
    next();
});
//# sourceMappingURL=auth.js.map