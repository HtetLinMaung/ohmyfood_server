import { Schema, model, Document } from "mongoose";
import { softDeleteSchema } from "../utils/mongoose-tools";

interface IMenu extends Document {
  _doc: any;
  name: string;
  description: string;
  price: number;
  discountPercent: number;
  imageUrl: string;
  categories: string[];
  menuTypes: string[];
  ingredients: string[];
  isOutOfStock: boolean;
  isAvailable: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

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
  isOutOfStock: {
    type: Boolean,
    default: false,
  },
  availableAt: Date,
  deletedAt: Date,
});

softDeleteSchema(menuSchema);

export default model<IMenu>("menus", menuSchema);
