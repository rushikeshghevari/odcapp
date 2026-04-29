import { courier_masters } from "./courierMaster.model";

// CREATE
export const createCourierMasterService = async (
  company_name: string,
  contact_number: string
) => {
  const existingCompany = await courier_masters.findOne({
    company_name,
    is_deleted: false,
  });

  if (existingCompany) {
    throw new Error("Courier company already exists");
  }

  return await courier_masters.create({
    company_name,
    contact_number,
  });
};

// GET ALL
export const getCourierMasterService = async () => {
  return await courier_masters
    .find({ is_deleted: false })
    .sort({ createdAt: -1 });
};

// UPDATE
export const updateCourierMasterService = async (
  id: string,
  company_name: string,
  contact_number: string
) => {
  const existingCompany = await courier_masters.findOne({
    company_name,
    is_deleted: false,
    _id: { $ne: id },
  });

  if (existingCompany) {
    throw new Error("Courier company already exists");
  }

  return await courier_masters.findByIdAndUpdate(
    id,
    { company_name, contact_number },
    { new: true }
  );
};

// DELETE (SOFT)
export const deleteCourierMasterService = async (id: string) => {
  return await courier_masters.findByIdAndUpdate(
    id,
    { is_deleted: true },
    { new: true }
  );
};