import express from "express";
import {
  createUserMaster,
  getUserMaster,
  updateUserMaster,
  deleteUserMaster,
} from "./userMaster.controller";

import { verifyToken, checkRole } from "../auth/auth.middleware";

const router = express.Router();

router.post("/add", verifyToken, checkRole("SUPERADMIN"), createUserMaster);

router.get("/list", verifyToken, checkRole("SUPERADMIN"), getUserMaster);

router.put(
  "/update/:id",
  verifyToken,
  checkRole("SUPERADMIN"),
  updateUserMaster
);

router.delete(
  "/delete/:id",
  verifyToken,
  checkRole("SUPERADMIN"),
  deleteUserMaster
);

export default router;