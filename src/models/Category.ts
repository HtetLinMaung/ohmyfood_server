import { Schema, model } from "mongoose";
import { softDeleteSchema } from "../utils/mongoose-tools";

const categorySchema = new Schema(
  {
    name: {
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
    availableTime: {
      openHour: {
        type: String,
        required: true,
      },
      closeHour: {
        type: String,
        required: true,
      },
    },
    imageUrl: {
      type: String,
      required: true,
    },
    tags: [String],
    types: [
      {
        ref: "categoryTypes",
        type: Schema.Types.ObjectId,
      },
    ],
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

softDeleteSchema(categorySchema);

export default model("categories", categorySchema);
