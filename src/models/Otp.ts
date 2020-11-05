import { Schema, model } from "mongoose";

const otpSchema = new Schema({
  phone: {
    type: String,
    required: true,
  },
  otpCode: {
    type: String,
    default: Math.floor(1000 + Math.random() * 9000).toString(),
  },
});

export default model("otp", otpSchema);
