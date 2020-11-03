import { Schema, model } from "mongoose";
import { softDeleteSchema } from "../utils/mongoose-tools";

const userSchema = new Schema(
  {
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
        type: Schema.Types.ObjectId,
        ref: "orders",
      },
    ],
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

softDeleteSchema(userSchema);

export default model("users", userSchema);
