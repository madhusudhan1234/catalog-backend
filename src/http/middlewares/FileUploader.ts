import crypto from "crypto";
import fs from "fs";
import multer from "multer";
import path from "path";

export class FileUploader {
  static upload(
    fileFieldName: string,
    folderName: string,
    filesize: number,
    fileTypes: string[] = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
  ) {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const folder = path.resolve(`uploads/${folderName}`);
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder);
        }
        cb(null, folder);
      },
      filename: (req, file, callBack) => {
        callBack(
          null,
          crypto.randomBytes(16).toString("hex") +
            path.extname(file.originalname)
        );
      },
    });

    const fileFilter = (req, file, cb) => {
      if (fileTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type"), false);
      }
    };

    let upload = multer({
      storage: storage,
      limits: { fileSize: filesize },
      fileFilter,
    }).array(fileFieldName);

    return upload;
  }
}
