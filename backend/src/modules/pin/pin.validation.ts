import { Router, Request, Response } from "express";
import path from "path";

const allowedExtensions = [".jpg", ".jpeg", ".png"];
const maxFileSize = 10 * 1024 * 1024;

export function fileValidationMiddleware(
  req: Request,
  res: Response,
  next: Function
) {
  const file = req.file;

  if (!file) {
    return res.status(422).json({
      message: "No file provided for upload.",
    });
  }

  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    return res.status(422).json({
      message:
        "Invalid file extension. Allowed extensions are .jpg, .jpeg, .png.",
    });
  }

  if (file.size > maxFileSize) {
    return res.status(422).json({
      message: "File size exceeds the maximum limit of 10MB.",
    });
  }
  next();
}
