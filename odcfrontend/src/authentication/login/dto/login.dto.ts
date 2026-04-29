import { z } from "zod";

export const loginSchema = z.object({
    phone: z
        .string()
        .trim()
        .min(1, "Mobile number is required")
        .regex(/^[0-9]{10}$/, "Enter valid 10 digit mobile number"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});


export type LoginRequestDto = z.infer<typeof loginSchema>;

export type LoginUserDto = {
    id: string;
    name: string;
    phone: string;
    role: "superadmin" | "user";
};

export type LoginResponseDto = {
    success: boolean;
    message: string;
    token?: string;
    user?: LoginUserDto;
};