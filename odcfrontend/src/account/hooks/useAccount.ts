import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import type { LoggedInUserDto } from "../dto/account.dto";
import { AccountService } from "../services/Account.service";

export function useAccount() {
    const [user, setUser] = useState<LoggedInUserDto | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadAccount = useCallback(async () => {
        setIsLoading(true);

        try {
            const loggedInUser = await AccountService.getLoggedInUser();
            const authToken = await AccountService.getAuthToken();

            setUser(loggedInUser);
            setToken(authToken);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        await AccountService.signOut();
        setUser(null);
        setToken(null);

        router.replace("/auth/login" as any);
    }, []);

    useEffect(() => {
        loadAccount();
    }, [loadAccount]);

    return {
        user,
        token,
        isLoading,
        loadAccount,
        signOut,
    };
}