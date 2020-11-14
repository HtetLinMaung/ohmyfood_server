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
    schema.statics.findWithoutDeleted = function (filter, path) {
        if (path === void 0) { path = ""; }
        var find = this.find({
            $or: [
                __assign(__assign({}, filter), { deletedAt: { $exists: false } }),
                __assign(__assign({}, filter), { deletedAt: { $in: [null, ""] } }),
            ],
        });
        if (path) {
            find = find.populate({
                path: path,
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
    schema.statics.findOneWithoutDeleted = function (filter, path) {
        if (path === void 0) { path = ""; }
        var findOne = this.findOne({
            $or: [
                __assign(__assign({}, filter), { deletedAt: { $exists: false } }),
                __assign(__assign({}, filter), { deletedAt: { $in: [null, ""] } }),
            ],
        });
        if (path) {
            findOne = findOne.populate({
                path: path,
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
    schema.statics.softDeleteById = function (id) {
        return this.updateOne({ _id: id }, { $set: { deletedAt: new Date() } });
    };
};
//# sourceMappingURL=mongoose-tools.js.map