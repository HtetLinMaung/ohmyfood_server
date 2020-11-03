"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_tools_1 = require("../utils/mongoose-tools");
var crypto_1 = require("crypto");
var orderSchema = new mongoose_1.Schema({
    code: {
        type: String,
        default: crypto_1.randomBytes(8).toString("hex"),
    },
    items: [
        {
            quantity: {
                type: Number,
                default: 1,
            },
            menuId: {
                ref: "menus",
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
            },
            ingredients: [
                {
                    ingredientId: {
                        ref: "ingredients",
                        type: mongoose_1.Schema.Types.ObjectId,
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        default: 1,
                    },
                },
            ],
        },
    ],
    user: {
        ref: "users",
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    location: {
        loc: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        address: String,
        doorNo: String,
        street: String,
    },
    orderStatus: {
        // 1 => requested, 0 => rejected, 2 => prepareing, 3 => ready, 4 => closed
        type: Number,
        default: 1,
    },
    deletedAt: Date,
}, { timestamps: true });
mongoose_tools_1.softDeleteSchema(orderSchema);
exports.default = mongoose_1.model("orders", orderSchema);
//# sourceMappingURL=Order.js.map