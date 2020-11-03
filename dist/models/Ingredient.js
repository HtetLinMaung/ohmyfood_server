"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_tools_1 = require("../utils/mongoose-tools");
var ingredientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    oneOrMore: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: 0.0,
    },
    menus: [
        {
            ref: "menus",
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    deletedAt: Date,
}, { timestamps: true });
mongoose_tools_1.softDeleteSchema(ingredientSchema);
exports.default = mongoose_1.model("ingredients", ingredientSchema);
//# sourceMappingURL=Ingredient.js.map