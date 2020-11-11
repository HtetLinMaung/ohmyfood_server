import { Schema, model, Document } from "mongoose";
import { softDeleteSchema } from "../utils/mongoose-tools";

interface ICategoryType extends Document {
  name: string;
  imageUrl: string;
  include: boolean;
  categories: string[];
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  _doc: any;
}

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
    include: {
      type: Boolean,
      default: false,
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

export default model<ICategoryType>("categoryTypes", categoryTypeSchema);
