import { z } from "zod";

export const signupSchema = z.object({
    mobileNo: z
        .string()
        .trim()
        .min(1, "Mobile number is required")
        .regex(/^[0-9]{10}$/, "Enter valid 10 digit mobile number"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});


export type SignupRequestDto = z.infer<typeof signupSchema>;

export type SignupUserDto = {
    id: string;
    mobileNo: string;
    role: "superadmin" | "user";
};

export type SignupResponseDto = {
    success: boolean;
    message: string;
    token?: string;
    user?: SignupUserDto;
};