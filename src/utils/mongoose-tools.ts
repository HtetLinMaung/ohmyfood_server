import { Schema } from "mongoose";

export const softDeleteSchema = (schema: Schema<any>) => {
  schema.statics.findWithoutDeleted = function (
    filter: any,
    path: string = ""
  ) {
    let find = this.find({
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
    if (path) {
      find = find.populate({
        path,
        match: {
          $or: [
            { deletedAt: { $exists: false } },
            { deletedAt: { $in: ["", null] } },
          ],
        },
      });
    }
    return find;
  };

  schema.statics.findOneWithoutDeleted = function (
    filter: any,
    path: string = ""
  ) {
    let findOne = this.findOne({
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
    if (path) {
      findOne = findOne.populate({
        path,
        match: {
          $or: [
            { deletedAt: { $exists: false } },
            { deletedAt: { $in: ["", null] } },
          ],
        },
      });
    }
    return findOne;
  };

  schema.statics.softDeleteById = function (id: string) {
    return this.updateOne({ _id: id }, { $set: { deletedAt: new Date() } });
  };
};
