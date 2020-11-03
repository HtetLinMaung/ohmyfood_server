import { Schema, model } from "mongoose";
import { softDeleteSchema } from "../utils/mongoose-tools";

const ingredientSchema = new Schema(
  {
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
        type: Schema.Types.ObjectId,
      },
    ],
    deletedAt: Date,
  },
  { timestamps: true }
);

softDeleteSchema(ingredientSchema);

export default model("ingredients", ingredientSchema);
