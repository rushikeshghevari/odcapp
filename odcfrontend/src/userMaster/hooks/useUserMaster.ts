import { useCallback, useEffect, useState } from "react";

import type {
    UserMasterFormValues,
    UserMasterRow,
} from "../dto/userMaster.dto";

import { UserMasterService } from "../services/UserMaster.service";
import { Alert } from "react-native";

export function useUserMaster() {
    const [users, setUsers] = useState<UserMasterRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadUserMasters = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await UserMasterService.getUserMasters();
            setUsers(response.data);
            return response;
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || "Failed to load users.";
            setError(message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createUserMaster = useCallback(
        async (payload: UserMasterFormValues) => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await UserMasterService.createUserMaster(payload);
                setUsers((prev) => [response.data, ...prev]);
                return response;
            } catch (err: any) {
                const message = err.response?.data?.message || err.message || "Failed to save user.";
                setError(message);
                Alert.alert("Error Creating User", message);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const updateUserMaster = useCallback(
        async (id: string, payload: UserMasterFormValues) => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await UserMasterService.updateUserMaster(id, payload);

                setUsers((prev) =>
                    prev.map((item) => (item.id === id ? response.data : item))
                );

                return response;
            } catch (err: any) {
                const message = err.response?.data?.message || err.message || "Failed to update user.";
                setError(message);
                Alert.alert("Error Updating User", message);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const deleteUserMaster = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await UserMasterService.deleteUserMaster(id);
            setUsers(response.data);
            return response;
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || "Failed to delete user.";
            setError(message);
            Alert.alert("Error Deleting User", message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUserMasters();
    }, [loadUserMasters]);

    return {
        users,
        setUsers,
        loadUserMasters,
        createUserMaster,
        updateUserMaster,
        deleteUserMaster,
        isLoading,
        error,
    };
}
