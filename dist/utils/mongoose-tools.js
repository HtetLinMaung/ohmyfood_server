"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteSchema = void 0;
exports.softDeleteSchema = function (schema) {
    schema.statics.findWithoutDeleted = function (filter) {
        return this.find({
            $or: [
                __assign(__assign({}, filter), { deletedAt: { $exists: false } }),
                __assign(__assign({}, filter), { deletedAt: { $in: [null, ""] } }),
            ],
        });
    };
    schema.statics.findOneWithoutDeleted = function (filter) {
        return this.findOne({
            $or: [
                __assign(__assign({}, filter), { deletedAt: { $exists: false } }),
                __assign(__assign({}, filter), { deletedAt: { $in: [null, ""] } }),
            ],
        });
    };
    schema.statics.softDeleteById = function (id) {
        return this.updateOne({ _id: id }, { $set: { deletedAt: new Date() } });
    };
};
//# sourceMappingURL=mongoose-tools.js.map