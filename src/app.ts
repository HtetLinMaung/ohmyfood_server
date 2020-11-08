import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./graphql/schema";
import resolver from "./graphql/resolver";
import auth from "./middlewares/auth";
import s3 from "./storage";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import uploadImage from "./middlewares/uploadImage";
import beforeImageUpload from "./middlewares/beforeImageUpload";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME || "bucket",
    acl: "public-read",
    metadata(_req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(_req, _file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

app.use(express.json());
app.use(auth);
app.use("/upload-image", beforeImageUpload);
app.use(upload.single("image"));
app.post("/upload-image", uploadImage);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
    customFormatErrorFn: (err) => {
      const originalError: any = err.originalError;
      if (!originalError) {
        return err;
      }
      const data = originalError.data;
      const message = err.message;
      const code = originalError.code || 500;
      return { message, status: code, data };
    },
  })
);

mongoose
  .connect(process.env.DATABASE || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
