import { Schema, model } from "mongoose";
import { softDeleteSchema } from "../utils/mongoose-tools";

const categoryTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    categories: [
      {
        ref: "categories",
        type: Schema.Types.ObjectId,
      },
    ],
    deletedAt: Date,
  },
  { timestamps: true }
);

softDeleteSchema(categoryTypeSchema);

export default model("categoryTypes", categoryTypeSchema);
