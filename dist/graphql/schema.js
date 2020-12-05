"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var graphql_tools_1 = require("../utils/graphql-tools");
exports.default = graphql_1.buildSchema(graphql_tools_1.mergeSchema([
    graphql_tools_1.importSchema("schemas/authSchema.gql"),
    graphql_tools_1.importSchema("schemas/categorySchema.gql"),
    graphql_tools_1.importSchema("schemas/categoryTypeSchema.gql"),
    graphql_tools_1.importSchema("schemas/menuSchema.gql"),
]));
//# sourceMappingURL=schema.js.map