import { Schema, model } from "mongoose";
import { softDeleteSchema } from "../utils/mongoose-tools";
import { randomBytes } from "crypto";

const orderSchema = new Schema(
  {
    code: {
      type: String,
      default: randomBytes(8).toString("hex"),
    },
    items: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        menuId: {
          ref: "menus",
          type: Schema.Types.ObjectId,
          required: true,
        },
        ingredients: [
          {
            ingredientId: {
              ref: "ingredients",
              type: Schema.Types.ObjectId,
              required: true,
            },
            quantity: {
              type: Number,
              default: 1,
            },
          },
        ],
      },
    ],
    user: {
      ref: "users",
      type: Schema.Types.ObjectId,
      required: true,
    },
    location: {
      loc: {
        type: {
          type: String,
          enum: ["Point"],
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
      address: String,
      doorNo: String,
      street: String,
    },
    orderStatus: {
      // 1 => requested, 0 => rejected, 2 => prepareing, 3 => ready, 4 => closed
      type: Number,
      default: 1,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

softDeleteSchema(orderSchema);

export default model("orders", orderSchema);
