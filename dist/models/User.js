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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "customer",
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
userSchema.statics.findWithoutDeleted = function (filter) {
    return this.find(__assign(__assign({}, filter), { deletedAt: { $exists: false } }));
};
exports.default = mongoose_1.model("users", userSchema);
//# sourceMappingURL=User.js.map