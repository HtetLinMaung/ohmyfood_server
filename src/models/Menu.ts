import { Schema, model } from "mongoose";
import { softDeleteSchema } from "../utils/mongoose-tools";

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
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
  menuTypes: [
    {
      ref: "menuTypes",
      type: Schema.Types.ObjectId,
    },
  ],
  ingredients: [
    {
      ref: "ingredients",
      type: Schema.Types.ObjectId,
    },
  ],
  deletedAt: Date,
});

softDeleteSchema(menuSchema);

export default model("menus", menuSchema);
