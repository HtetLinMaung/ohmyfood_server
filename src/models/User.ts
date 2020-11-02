import { Schema, model } from "mongoose";

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
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.statics.findWithoutDeleted = function (filter: any) {
  return this.find({ ...filter, deletedAt: { $exists: false } });
};

export default model("users", userSchema);
