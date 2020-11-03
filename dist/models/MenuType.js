"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_tools_1 = require("../utils/mongoose-tools");
var menuTypeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    menus: [
        {
            ref: "menus",
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    deletedAt: Date,
}, { timestamps: true });
mongoose_tools_1.softDeleteSchema(menuTypeSchema);
exports.default = mongoose_1.model("menuTypes", menuTypeSchema);
//# sourceMappingURL=MenuType.js.map