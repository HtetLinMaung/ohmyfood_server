"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_tools_1 = require("../utils/mongoose-tools");
var categoryTypeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    include: {
        type: Boolean,
        default: false,
    },
    categories: [
        {
            ref: "categories",
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    deletedAt: Date,
}, { timestamps: true });
mongoose_tools_1.softDeleteSchema(categoryTypeSchema);
exports.default = mongoose_1.model("categoryTypes", categoryTypeSchema);
//# sourceMappingURL=CategoryType.js.map