import { z } from "zod";

export const courierEntrySchema = z.object({
    uuid4: z.string().optional(),

    courierName: z
        .string()
        .trim()
        .min(1, "Please select courier"),

    boxQuantity: z
        .string()
        .trim()
        .min(1, "Please enter quantity of box")
        .regex(/^[0-9]+$/, "Quantity must be a number"),

    collectedBy: z
        .string()
        .trim()
        .min(1, "Please enter collected by name"),

    phoneNumber: z
        .string()
        .trim()
        .min(1, "Please enter phone number")
        .regex(/^[0-9]{10}$/, "Please enter valid 10 digit phone number"),

    photoUri: z.string().optional(),
});

export type CourierEntryFormValues = z.infer<typeof courierEntrySchema>;

export type CourierRow = {
    id: string;
    name: string;
};

export type CourierEntryRow = CourierEntryFormValues & {
    id: string;
};

export type GetCourierEntriesResponse = {
    data: CourierEntryRow[];
    totalRecords: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type CourierEntryResponse = {
    data: CourierEntryRow;
    message: string;
    success: boolean;
};
