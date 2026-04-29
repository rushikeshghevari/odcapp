import { z } from "zod";

export const courierMasterSchema = z.object({
    uuid4: z.string().optional(),

    courierName: z
        .string()
        .trim()
        .min(1, "Courier name is required"),

    mobileNo: z
        .string()
        .trim()
        .min(1, "Mobile number is required")
        .regex(/^[0-9]{10}$/, "Enter valid 10 digit mobile number"),
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
