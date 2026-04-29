import { apiClient } from "@/src/api/apiClient";

import type {
  LoginRequestDto,
  LoginResponseDto,
  LoginUserDto,
} from "../dto/login.dto";

type LoginApiResponse = {
  success: boolean;
  message: string;
  token?: string;
  data?: {
    id: string;
    name: string;
    phone: string;
    role: string;
  };
};

function mapLoginUser(user: NonNullable<LoginApiResponse["data"]>): LoginUserDto {
  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    role: (user.role || "USER").toLowerCase() as LoginUserDto["role"],
  };
}

export class LoginService {
  static async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await apiClient.post<LoginApiResponse>("/auth/login", {
      phone: payload.phone,
      password: payload.password,
    });

    return {
      success: response.data.success,
      message: response.data.message,
      token: response.data.token,
      user: response.data.data ? mapLoginUser(response.data.data) : undefined,
    };
  }
}
