import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { checkAuthMiddleware } from "../../middleware/checkAuthMiddleware";
import { AuthResponse } from "../../types";
import { handleError } from "../../errors/errors";
import { add } from "./pin.services";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.config";
import multer from "multer";
import { fileValidationMiddleware } from "./pin.validation";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });
router.post(
  "/",
  checkAuthMiddleware,
  upload.single("filename"),
  fileValidationMiddleware,
  async (req: Request, res: AuthResponse) => {
    try {
      const user_id = res.locals.authUser.user_id;
      const { description } = req.body;
      const fileID = uuidv4();
      const storageRef = ref(storage, `files/${fileID}`);

      if (!req.file) {
        return res.status(422).json({
          message: "No file provided for upload.",
        });
      }

      const metaData = {
        contentType: req.file.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file?.buffer,
        metaData
      );

      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log(">>>> request user_id", user_id);

      const dateTime = new Date();
      const data = {
        user_id,
        description,
        image_url: downloadURL,
        created_at: dateTime,
      };

      const createdPin = await add(data);
      res.status(201).json({
        message: "Pin uploaded successfully.",
        contentDetails: createdPin,
      });
    } catch (error) {
      handleError(error, res);
    }
  }
);

export default router;
