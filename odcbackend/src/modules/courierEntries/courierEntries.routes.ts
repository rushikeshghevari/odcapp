import { Router } from "express";
import multer from "multer";
import path from "path";

import {
  createCourierEntry,
  getCourierEntries,
  getCourierEntryById,
  updateCourierEntry,
  deleteCourierEntry,
} from "./courierEntries.controller";

const router = Router();

// ======================
// MULTER CONFIG
// ======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "public/uploads"));
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ======================
// ROUTES
// ======================
router.post("/", upload.single("picture"), createCourierEntry);

router.get("/", getCourierEntries);

router.get("/:id", getCourierEntryById);

router.put("/:id", upload.single("picture"), updateCourierEntry);

router.delete("/:id", deleteCourierEntry);

export default router;
