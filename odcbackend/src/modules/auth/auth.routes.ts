import express from "express";
import {
  registerUser,
  signupUser,
  loginUser,
  deleteUser,
} from "./auth.controller";

import { checkRole, verifyToken } from "./auth.middleware";

const router = express.Router();

//Register(only SUPERADMIN)
router.post(
  "/register",
  verifyToken,
  checkRole("SUPERADMIN"),
  registerUser
);

//router.post("/register", registerUser);

// Signup (public)
router.post("/signup", signupUser);

// Login (public)
router.post("/login", loginUser);

// DELETE USER (SUPERADMIN ONLY)
router.delete(
  "/users/:id",
  verifyToken,
  checkRole("SUPERADMIN"),
  deleteUser
);

export default router;