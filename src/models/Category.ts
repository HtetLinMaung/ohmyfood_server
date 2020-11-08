import { Schema, model, Document } from "mongoose";
import { softDeleteSchema } from "../utils/mongoose-tools";

interface ICategory extends Document {
  _doc: any;
  name: string;
  price: number;
  discountPercent: number;
  availableTime: {
    openHour: string;
    closeHour: string;
  };
  imageUrl: string;
  tags: string[];
  types: string[];
  menus: string[];
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

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

export default model<ICategory>("categories", categorySchema);
