import { useCallback, useState } from "react";

import type { LoginRequestDto, LoginResponseDto } from "../dto/login.dto";
import { LoginService } from "../services/Login.service";

function mapLoginErrorMessage(err: any): string {
    const apiMessage = String(err?.response?.data?.message || "")
        .trim()
        .toLowerCase();

    if (
        apiMessage.includes("phone number doesnt exists") ||
        apiMessage.includes("phone number doesn't exist") ||
        apiMessage.includes("phone number does not exist")
    ) {
        return "This phone number is not registered. Please sign up first.";
    }

    if (apiMessage.includes("invalid") || apiMessage.includes("password")) {
        return "Invalid phone number or password.";
    }

    if (err?.message === "Network Error") {
        return "Unable to connect to server. Please check your internet or try again.";
    }

    return "Login failed. Please try again.";
}

export function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<LoginResponseDto | null>(null);

    const login = useCallback(async (payload: LoginRequestDto) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await LoginService.login(payload);
            setData(response);
            return response;
        } catch (err: any) {
            const message = mapLoginErrorMessage(err);
            setError(message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setError(null);
        setData(null);
    }, []);

    return {
        login,
        reset,
        isLoading,
        error,
        data,
    };
}
