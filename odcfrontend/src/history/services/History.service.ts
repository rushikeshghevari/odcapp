import { apiClient } from "@/src/api/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type {
    GetHistoryEntriesResponse,
    HistoryEntryRow,
    LoggedInUserDto,
} from "../dto/history.dto";

const uploadBaseUrl = (apiClient.defaults.baseURL || "").replace(/\/api\/?$/, "");

function buildPhotoUrl(picture?: string | null) {
    if (!picture) return "";

    if (/^https?:\/\//i.test(picture)) {
        const separator = picture.includes("?") ? "&" : "?";
        return `${picture}${separator}t=${Date.now()}`;
    }

    const filename = picture.split(/[\\/]/).pop();
    return `${uploadBaseUrl}/uploads/${filename}?t=${Date.now()}`;
}

export class HistoryService {
    static async getLoggedInUser(): Promise<LoggedInUserDto | null> {
        const storedUser = await AsyncStorage.getItem("loggedInUser");

        if (!storedUser) {
            return null;
        }

        return JSON.parse(storedUser) as LoggedInUserDto;
    }

    static async getHistoryEntries(page = 1, limit = 100): Promise<GetHistoryEntriesResponse> {
        const loggedInUser = await this.getLoggedInUser();

        if (!loggedInUser) {
            return {
                data: [],
                totalRecords: 0,
                page: 1,
                limit: 10,
                totalPages: 1,
            };
        }

        try {
            const response = await apiClient.get(`/courier?page=${page}&limit=${limit}`);
            
            if (!response.data || !response.data.success) {
                throw new Error("Failed to fetch history");
            }

            const rawData = response.data.data || [];

            const mappedData: HistoryEntryRow[] = rawData.map((item: any) => ({
                id: item._id,
                date: item.entryDate,
                courierName: item.courierId?.company_name || "Unknown Courier",
                boxQuantity: String(item.quantity),
                collectedBy: item.collectedBy,
                hasPhoto: !!item.picture,
                userMobileNo: item.contactNumber,
                photoUri: buildPhotoUrl(item.picture),
            }));

            const filteredData =
                loggedInUser.role.toLowerCase() === "superadmin"
                    ? mappedData
                    : mappedData.filter(
                        (entry) => entry.userMobileNo === (loggedInUser as any).phone
                    );

            return {
                data: filteredData,
                totalRecords: filteredData.length,
                page: response.data.currentPage || 1,
                limit: response.data.pageSize || limit,
                totalPages: response.data.totalPages || 1,
            };
        } catch (error) {
            console.error("Error fetching history:", error);
            throw error;
        }
    }
}
