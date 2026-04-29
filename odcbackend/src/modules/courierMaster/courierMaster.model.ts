import { Schema, model } from "mongoose";

const CourierMasterSchema = new Schema(
  {
    company_name: {
      type: String,
      required: true,
      trim: true,
    },

    contact_number: {
      type: String,
      required: true,
      trim: true,
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const courier_masters = model(
  "courier_masters",
  CourierMasterSchema
);