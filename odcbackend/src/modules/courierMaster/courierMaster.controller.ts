import { Request, Response } from "express";
import {
  createCourierMasterService,
  getCourierMasterService,
  updateCourierMasterService,
  deleteCourierMasterService,
} from "./courierMaster.services";

// CREATE
export const createCourierMaster = async (req: Request, res: Response) => {
  try {
    const { company_name, contact_number } = req.body;

    if (!company_name || !contact_number) {
      return res.status(400).json({
        success: false,
        message: "company_name and contact_number are required",
      });
    }

    const data = await createCourierMasterService(
      company_name,
      contact_number
    );

    return res.status(201).json({
      success: true,
      message: "Courier company created successfully",
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getCourierMaster = async (req: Request, res: Response) => {
  try {
    const data = await getCourierMasterService();

    return res.status(200).json({
      success: true,
      message: "Courier companies fetched successfully",
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
export const updateCourierMaster = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const { company_name, contact_number } = req.body;

    if (!company_name || !contact_number) {
      return res.status(400).json({
        success: false,
        message: "company_name and contact_number are required",
      });
    }

    const data = await updateCourierMasterService(
      id,
      company_name,
      contact_number
    );

    return res.status(200).json({
      success: true,
      message: "Courier company updated successfully",
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
export const deleteCourierMaster = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const data = await deleteCourierMasterService(id);

    return res.status(200).json({
      success: true,
      message: "Courier company deleted successfully",
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};