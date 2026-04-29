import { apiClient } from "@/src/api/apiClient";

import { SignupRequestDto, SignupResponseDto } from "../dto/signup.dto";

export class SignupService {
    static async signup(payload: SignupRequestDto): Promise<SignupResponseDto> {
        const response = await apiClient.post<{
            success: boolean;
            message: string;
        }>("/auth/signup", {
            phone: payload.mobileNo,
            password: payload.password,
        });

        return {
            success: response.data.success,
            message: response.data.message,
        };
    }
}
