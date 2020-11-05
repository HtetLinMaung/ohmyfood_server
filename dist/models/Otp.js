"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var otpSchema = new mongoose_1.Schema({
    phone: {
        type: String,
        required: true,
    },
    otpCode: {
        type: String,
        default: Math.floor(1000 + Math.random() * 9000).toString(),
    },
});
exports.default = mongoose_1.model("otp", otpSchema);
//# sourceMappingURL=Otp.js.map