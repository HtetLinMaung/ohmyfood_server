import { Schema, model } from "mongoose";
import { softDeleteSchema } from "../utils/mongoose-tools";

const menuTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    menus: [
      {
        ref: "menus",
        type: Schema.Types.ObjectId,
      },
    ],
    deletedAt: Date,
  },
  { timestamps: true }
);

softDeleteSchema(menuTypeSchema);

export default model("menuTypes", menuTypeSchema);
