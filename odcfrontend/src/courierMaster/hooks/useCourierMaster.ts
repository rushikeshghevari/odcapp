import { useCallback, useEffect, useState } from "react";

import type {
    CourierMasterFormValues,
    CourierMasterRow,
} from "../dto/courierMaster.dto";

import { CourierMasterService } from "../services/CourierMaster.service";

export function useCourierMaster() {
    const [courierMasters, setCourierMasters] = useState<CourierMasterRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadCourierMasters = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await CourierMasterService.getCourierMasters();
            setCourierMasters(response.data);
            return response;
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Failed to load couriers.";
            setError(message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createCourierMaster = useCallback(
        async (payload: CourierMasterFormValues) => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await CourierMasterService.createCourierMaster(payload);
                setCourierMasters((prev) => [response.data, ...prev]);
                return response;
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Failed to register courier.";
                setError(message);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const updateCourierMaster = useCallback(
        async (id: string, payload: CourierMasterFormValues) => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await CourierMasterService.updateCourierMaster(
                    id,
                    payload
                );

                setCourierMasters((prev) =>
                    prev.map((item) => (item.id === id ? response.data : item))
                );

                return response;
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Failed to update courier.";
                setError(message);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const deleteCourierMaster = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await CourierMasterService.deleteCourierMaster(id);
            setCourierMasters(response.data);
            return response;
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Failed to delete courier.";
            setError(message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCourierMasters();
    }, [loadCourierMasters]);

    return {
        courierMasters,
        setCourierMasters,
        loadCourierMasters,
        createCourierMaster,
        updateCourierMaster,
        deleteCourierMaster,
        isLoading,
        error,
    };
}
