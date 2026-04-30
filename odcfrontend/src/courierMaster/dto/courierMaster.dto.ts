import { z } from "zod";

export const courierMasterSchema = z.object({
    uuid4: z
        .string()
        .uuid("Invalid courier ID.")
        .optional(),

    courierName: z
        .string()
        .trim()
        .min(1, "Courier name is required.")
        .min(2, "Courier name must be at least 2 characters.")
        .max(80, "Courier name must not be more than 80 characters.")
        .regex(
            /^[A-Za-z0-9&.\- ]+$/,
            "Courier name can contain only letters, numbers, spaces, &, dot, and hyphen."
        )
        .refine(
            (value) => !/\s{2,}/.test(value),
            "Courier name should not contain multiple spaces."
        ),

    mobileNo: z
        .string()
        .trim()
        .min(1, "Mobile number is required.")
        .regex(
            /^[6-9][0-9]{9}$/,
            "Enter valid 10 digit Indian mobile number."
        ),
});

export type CourierMasterFormValues = z.infer<typeof courierMasterSchema>;

export type CourierMasterRow = CourierMasterFormValues & {
    id: string;
};

export type GetCourierMastersResponse = {
    data: CourierMasterRow[];
    totalRecords: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type CourierMasterResponse = {
    data: CourierMasterRow;
    message: string;
    success: boolean;
};