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
var auth_1 = __importDefault(require("./middlewares/auth"));
var storage_1 = __importDefault(require("./storage"));
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var dotenv_1 = __importDefault(require("dotenv"));
var uploadImage_1 = __importDefault(require("./middlewares/uploadImage"));
var beforeImageUpload_1 = __importDefault(require("./middlewares/beforeImageUpload"));
dotenv_1.default.config();
var PORT = process.env.PORT || 3000;
var app = express_1.default();
var upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: storage_1.default,
        bucket: process.env.S3_BUCKET_NAME || "bucket",
        acl: "public-read",
        metadata: function (_req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (_req, _file, cb) {
            cb(null, Date.now().toString());
        },
    }),
});
app.use(express_1.default.json());
app.use(auth_1.default);
app.use("/upload-image", beforeImageUpload_1.default);
app.use(upload.single("image"));
app.post("/upload-image", uploadImage_1.default);
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: schema_1.default,
    rootValue: resolver_1.default,
    graphiql: true,
    customFormatErrorFn: function (err) {
        var originalError = err.originalError;
        if (!originalError) {
            return err;
        }
        var data = originalError.data;
        var message = err.message;
        var code = originalError.code || 500;
        return { message: message, status: code, data: data };
    },
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