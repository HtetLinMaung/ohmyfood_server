"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSchema = exports.importSchema = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var constants_1 = require("../constants");
exports.importSchema = function (filePath) {
    return fs_1.default.readFileSync(path_1.default.join(constants_1.rootDir, filePath), "utf-8");
};
exports.mergeSchema = function (schemaArray) {
    if (schemaArray === void 0) { schemaArray = []; }
    var gql = "schema { query: RootQuery } type RootQuery { ";
    for (var _i = 0, schemaArray_1 = schemaArray; _i < schemaArray_1.length; _i++) {
        var schema = schemaArray_1[_i];
        var match = schema.match(/type\s+RootQuery\s+{\s+((\w+:\s+\w+!?\s+)+)/);
        if (match) {
            gql += match[1];
        }
    }
    gql += "} ";
    for (var _a = 0, schemaArray_2 = schemaArray; _a < schemaArray_2.length; _a++) {
        var schema = schemaArray_2[_a];
        gql += schema
            .replace(/type\s+RootQuery\s+{\s+((\w+:\s+\w+!?\s+)+)}/, "")
            .replace(/schema\s+{\s+((\w+:\s+\w+!?\s+)+)}/, "");
    }
    console.log(gql);
    return gql;
};
//# sourceMappingURL=graphql-tools.js.map