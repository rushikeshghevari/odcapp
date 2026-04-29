import { z } from "zod";

export const userMasterSchema = z.object({
    uuid4: z.string().optional(),

    mobileNo: z
        .string()
        .trim()
        .min(1, "Mobile number is required")
        .regex(/^[0-9]{10}$/, "Enter valid 10 digit mobile number"),

    name: z
        .string()
        .trim()
        .min(1, "Name is required"),
});

export type UserMasterFormValues = z.infer<typeof userMasterSchema>;

export type UserMasterRow = {
    id: string;
    name: string;
    phone: string;
    initial: string;
    color: string;
};

export type GetUserMastersResponse = {
    data: UserMasterRow[];
    totalRecords: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type UserMasterResponse = {
    data: UserMasterRow;
    message: string;
    success: boolean;
};
