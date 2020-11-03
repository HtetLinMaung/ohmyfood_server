"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_tools_1 = require("../utils/mongoose-tools");
var categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0.0,
    },
    discountPercent: {
        type: Number,
        default: 0.0,
    },
    availableTime: {
        openHour: {
            type: String,
            required: true,
        },
        closeHour: {
            type: String,
            required: true,
        },
    },
    imageUrl: {
        type: String,
        required: true,
    },
    tags: [String],
    types: [
        {
            ref: "categoryTypes",
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    menus: [
        {
            ref: "menus",
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    deletedAt: Date,
}, { timestamps: true });
mongoose_tools_1.softDeleteSchema(categorySchema);
exports.default = mongoose_1.model("categories", categorySchema);
//# sourceMappingURL=Category.js.map