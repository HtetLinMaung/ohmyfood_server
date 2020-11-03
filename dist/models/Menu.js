"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_tools_1 = require("../utils/mongoose-tools");
var menuSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
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
    imageUrl: {
        type: String,
        required: true,
    },
    categories: [
        {
            ref: "categories",
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    menuTypes: [
        {
            ref: "menuTypes",
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    ingredients: [
        {
            ref: "ingredients",
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    deletedAt: Date,
});
mongoose_tools_1.softDeleteSchema(menuSchema);
exports.default = mongoose_1.model("menus", menuSchema);
//# sourceMappingURL=Menu.js.map