import { Response } from "express";
import s3 from "../storage";

export default async (req: any, res: Response) => {
  try {
    if (!req.file) {
      const error: any = new Error("File is empty!");
      error.code = 422;
      throw error;
    }
    if (req.body.oldImage) {
      clearImage(req.body.oldImage, (err: any, data: any) => {
        console.log(data);
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Something went wrong!" });
        }
      });
    }
    res.json({ imageUrl: req.file.location });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

const clearImage = (path: string, cb: any) => {
  const pathArray = path.split("/");
  const Key = pathArray[pathArray.length - 1];
  s3.deleteObject(
    {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key,
    },
    cb
  );
};
