"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_tools_1 = require("../utils/mongoose-tools");
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
    orders: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "orders",
        },
    ],
    deletedAt: Date,
}, {
    timestamps: true,
});
mongoose_tools_1.softDeleteSchema(userSchema);
exports.default = mongoose_1.model("users", userSchema);
//# sourceMappingURL=User.js.map