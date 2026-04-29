import bcrypt from "bcrypt";
import { UserMaster } from "../userMaster/userMaster.model";

// Register Service
export const registerUserService = async (
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

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserMaster.create({
    name,
    contactNumber: phone,
    password: hashedPassword,
    original_password: password,
    role: role || "USER",
    is_signup: false,
  });

  return user;
};

// Signup Service
export const signupUserService = async (
  phone: string,
  password: string
) => {
  const existingUser = await UserMaster.findOne({
    contactNumber: phone,
    is_deleted: false,
  });

  if (!existingUser) {
    throw new Error("User doesnt exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserMaster.updateOne(
    { contactNumber: phone },
    {
      $set: {
        password: hashedPassword,
        original_password: password,
        is_signup: true,
      },
    }
  );

  return await UserMaster.findOne({
    contactNumber: phone,
    is_deleted: false,
  });
};

// Login Service
export const loginUserService = async (
  phone: string,
  password: string
) => {
  const user = await UserMaster.findOne({
    contactNumber: phone,
    is_deleted: false,
  });

  if (!user) {
    throw new Error("phone number doesnt exists");
  }

  const isPasswordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatch) {
    return null;
  }

  return user;
};
