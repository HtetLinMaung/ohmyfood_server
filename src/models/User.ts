import { Schema, model, Document } from "mongoose";
import { softDeleteSchema } from "../utils/mongoose-tools";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}

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

export default model<IUser>("users", userSchema);
