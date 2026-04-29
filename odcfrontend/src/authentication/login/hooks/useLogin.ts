import { useCallback, useState } from "react";

import type { LoginRequestDto, LoginResponseDto } from "../dto/login.dto";
import { LoginService } from "../services/Login.service";

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
            console.error("LOGIN CATCH BLOCK ERROR:", err.message);
            if (err.response) {
                console.error("RESPONSE DATA:", err.response.data);
            }
            const message = err instanceof Error ? err.message : "Login failed.";
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