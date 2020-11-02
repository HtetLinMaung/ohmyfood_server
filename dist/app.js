"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var mongoose_1 = __importDefault(require("mongoose"));
var schema_1 = __importDefault(require("./graphql/schema"));
var resolver_1 = __importDefault(require("./graphql/resolver"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var PORT = process.env.PORT || 3000;
var app = express_1.default();
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: schema_1.default,
    rootValue: resolver_1.default,
    graphiql: true,
}));
mongoose_1.default
    .connect(process.env.DATABASE || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () {
    app.listen(PORT, function () { return console.log("Server listening on port " + PORT); });
})
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=app.js.map