import bcrypt from "bcrypt";
import { UserMaster } from "./userMaster.model";

// CREATE USER
export const createUserMasterService = async (
  name: string,
  phone: string,
  password: string,
  role: string
) => {
  const existingUser = await UserMaster.findOne({
    contactNumber: phone,
    is_deleted: false,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const initialPassword = password || phone;
  const hashedPassword = await bcrypt.hash(initialPassword, 10);

  const user = await UserMaster.create({
    name,
    contactNumber: phone,
    password: hashedPassword,
    original_password: initialPassword,
    role: role || "USER",
    is_signup: true,
    is_deleted: false,
  });

  return user;
};

// GET ALL USERS
export const getUserMasterService = async () => {
  return await UserMaster.find({ is_deleted: false }).sort({
    createdAt: -1,
  });
};

// UPDATE USER
export const updateUserMasterService = async (
  id: string,
  name: string,
  phone: string,
  role: string
) => {
  return await UserMaster.findByIdAndUpdate(
    id,
    { name, contactNumber: phone, role },
    { new: true }
  );
};

// SOFT DELETE USER
export const deleteUserMasterService = async (id: string) => {
  return await UserMaster.findByIdAndUpdate(
    id,
    { is_deleted: true },
    { new: true }
  );
};
