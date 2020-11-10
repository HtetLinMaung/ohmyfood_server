import { Schema } from "mongoose";

export const softDeleteSchema = (schema: Schema<any>) => {
  schema.statics.findWithoutDeleted = function (filter: any) {
    return this.find({
      $or: [
        {
          ...filter,
          deletedAt: { $exists: false },
        },
        {
          ...filter,
          deletedAt: { $in: [null, ""] },
        },
      ],
    });
  };

  schema.statics.findOneWithoutDeleted = function (filter: any) {
    return this.findOne({
      $or: [
        {
          ...filter,
          deletedAt: { $exists: false },
        },
        {
          ...filter,
          deletedAt: { $in: [null, ""] },
        },
      ],
    });
  };

  schema.statics.softDeleteById = function (id: string) {
    return this.updateOne({ _id: id }, { $set: { deletedAt: new Date() } });
  };
};
