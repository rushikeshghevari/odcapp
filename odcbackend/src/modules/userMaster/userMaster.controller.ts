import { Request, Response } from "express";
import {
  createUserMasterService,
  getUserMasterService,
  updateUserMasterService,
  deleteUserMasterService,
} from "./userMaster.services";

// CREATE USER
export const createUserMaster = async (req: Request, res: Response) => {
  try {
    const { name, phone, password, role } = req.body;

    const data = await createUserMasterService(
      name,
      phone,
      password,
      role
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL USERS
export const getUserMaster = async (_req: Request, res: Response) => {
  try {
    const data = await getUserMasterService();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE USER
export const updateUserMaster = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;

    // ✅ FIX: handle string | string[]
    if (Array.isArray(id)) {
      id = id[0];
    }

    const { name, phone, role } = req.body;

    const data = await updateUserMasterService(
      id,
      name,
      phone,
      role
    );

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE USER
export const deleteUserMaster = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;

    // ✅ FIX: handle string | string[]
    if (Array.isArray(id)) {
      id = id[0];
    }

    const data = await deleteUserMasterService(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};