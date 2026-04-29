import { Schema, model } from "mongoose";

export enum Role {
  SUPERADMIN = "SUPERADMIN",
  USER = "USER",
}

const UserMasterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    original_password: {
      type: String,
      required: false,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },

    is_signup: {
      type: Boolean,
      default: false,
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserMaster = model("user_masters", UserMasterSchema);