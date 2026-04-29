import { useCallback, useState } from "react";

import { SignupRequestDto, SignupResponseDto } from "../dto/signup.dto";
import { SignupService } from "../services/Signup.service";

export function useSignup() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<SignupResponseDto | null>(null);

    const signup = useCallback(async (payload: SignupRequestDto) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await SignupService.signup(payload);
            setData(response);
            return response;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Signup failed.";
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
        signup,
        reset,
        isLoading,
        error,
        data,
    };
}