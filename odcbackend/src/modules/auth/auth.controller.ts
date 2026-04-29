import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import {
  registerUserService,
  signupUserService,
  loginUserService,
} from "./auth.sevices";
import { UserMaster } from "../userMaster/userMaster.model";

// =======================
// REGISTER CONTROLLER
// =======================
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, phone, password, role } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and password are required",
      });
    }

    const user = await registerUserService(name, phone, password, role);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

// =======================
// SIGNUP CONTROLLER
// =======================
export const signupUser = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "phone and password are required",
      });
    }

    const user = await signupUserService(phone, password);

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Signup failed",
    });
  }
};

// =======================
// LOGIN CONTROLLER
// =======================
export const loginUser = async (req: Request, res: Response) => {
  try {
    console.log("LOGIN REQUEST RECEIVED:", req.body);
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone and password are required",
      });
    }

    const user = await loginUserService(phone, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user._id,
        name: user.name,
        phone: user.contactNumber,
        role: user.role,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

// =======================
// DELETE USER CONTROLLER
// =======================
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await UserMaster.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await UserMaster.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Delete failed",
    });
  }
};