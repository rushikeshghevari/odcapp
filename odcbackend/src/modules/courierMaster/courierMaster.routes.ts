import express from "express";
import {
  createCourierMaster,
  getCourierMaster,
  updateCourierMaster,
  deleteCourierMaster,
} from "./courierMaster.controller";

import { verifyToken, checkRole } from "../auth/auth.middleware";

const router = express.Router();

// CREATE
router.post(
  "/add",
  verifyToken,
  checkRole("SUPERADMIN"),
  createCourierMaster
);

// LIST
router.get(
  "/list",
  verifyToken,
  checkRole("SUPERADMIN", "USER"),
  getCourierMaster
);

// UPDATE
router.put(
  "/update/:id",
  verifyToken,
  checkRole("SUPERADMIN"),
  updateCourierMaster
);

// DELETE
router.delete(
  "/delete/:id",
  verifyToken,
  checkRole("SUPERADMIN"),
  deleteCourierMaster
);

export default router;