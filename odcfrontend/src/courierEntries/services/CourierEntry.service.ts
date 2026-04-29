import { apiClient } from "@/src/api/apiClient";

import type {
    CourierEntryFormValues,
    CourierEntryResponse,
    CourierEntryRow,
    CourierRow,
    GetCourierEntriesResponse,
} from "../dto/courierEntry.dto";

type CourierMasterApiRow = {
    _id: string;
    company_name: string;
};

type CourierEntryApiRow = {
    _id: string;
    quantity: number;
    collectedBy: string;
    contactNumber: string;
    picture?: string | null;
    courierId?:
        | {
            _id: string;
            company_name: string;
        }
        | string;
};

const uploadBaseUrl = (apiClient.defaults.baseURL || "").replace(/\/api\/?$/, "");

function buildPhotoUrl(picture?: string | null) {
    if (!picture) {
        return undefined;
    }

    // Guard against corrupted JSON object strings saved from previous bugs
    if (picture.trim().startsWith("{") || picture.includes("[object Object]")) {
        return undefined;
    }

    if (/^https?:\/\//i.test(picture)) {
        return picture;
    }

    // Extract just the filename, regardless of whether it's an absolute Windows path or relative Unix path
    const filename = picture.split(/[\\/]/).pop();

    // The backend serves static files at /uploads
    return `${uploadBaseUrl}/uploads/${filename}`;
}

function mapEntryRow(item: CourierEntryApiRow): CourierEntryRow {
    const courierName =
        typeof item.courierId === "object" && item.courierId
            ? item.courierId.company_name
            : "";

    return {
        id: item._id,
        courierName,
        boxQuantity: String(item.quantity),
        phoneNumber: item.contactNumber,
        collectedBy: item.collectedBy,
        photoUri: buildPhotoUrl(item.picture),
    };
}

async function getCourierListInternal() {
    const response = await apiClient.get<{
        data: CourierMasterApiRow[];
    }>("/courier-master/list");

    return response.data.data.map((item) => ({
        id: item._id,
        name: item.company_name,
    }));
}

async function getCourierIdByName(courierName: string) {
    const couriers = await getCourierListInternal();
    const matchedCourier = couriers.find((item) => item.name === courierName);

    if (!matchedCourier) {
        throw new Error("Selected courier was not found in courier master.");
    }

    return matchedCourier.id;
}

export class CourierEntryService {
    static async getCourierList(): Promise<CourierRow[]> {
        return getCourierListInternal();
    }

    static async getEntries(): Promise<GetCourierEntriesResponse> {
        const AsyncStorage = require("@react-native-async-storage/async-storage").default;
        const storedUser = await AsyncStorage.getItem("loggedInUser");
        const loggedInUser = storedUser ? JSON.parse(storedUser) : null;

        const response = await apiClient.get<{
            data: CourierEntryApiRow[];
            total?: number;
            currentPage?: number;
            pageSize?: number;
            totalPages?: number;
        }>("/courier");

        const mappedRows = response.data.data.map(mapEntryRow);

        let filteredRows = mappedRows;

        if (loggedInUser && loggedInUser.role.toLowerCase() !== "superadmin") {
            filteredRows = mappedRows.filter(
                (entry) => entry.phoneNumber === loggedInUser.phone
            );
        }

        return {
            data: filteredRows,
            totalRecords: filteredRows.length,
            page: response.data.currentPage ?? 1,
            limit: response.data.pageSize ?? (filteredRows.length || 10),
            totalPages: response.data.totalPages ?? 1,
        };
    }

    static async createEntry(
        payload: CourierEntryFormValues
    ): Promise<CourierEntryResponse> {
        const courierId = await getCourierIdByName(payload.courierName);

        const response = await apiClient.post<{
            success: boolean;
            message: string;
            data: CourierEntryApiRow;
        }>("/courier", {
            courierId,
            quantity: Number(payload.boxQuantity),
            collectedBy: payload.collectedBy,
            contactNumber: payload.phoneNumber,
        });

        return {
            success: response.data.success,
            message: response.data.message,
            data: mapEntryRow(response.data.data),
        };
    }

    static async updateEntry(
        entryId: string,
        payload: CourierEntryFormValues
    ): Promise<CourierEntryResponse> {
        const courierId = await getCourierIdByName(payload.courierName);

        const response = await apiClient.put<{
            success: boolean;
            message: string;
            data: CourierEntryApiRow;
        }>(`/courier/${entryId}`, {
            courierId,
            quantity: Number(payload.boxQuantity),
            collectedBy: payload.collectedBy,
            contactNumber: payload.phoneNumber,
        });

        return {
            success: response.data.success,
            message: response.data.message,
            data: mapEntryRow(response.data.data),
        };
    }

    static async updateEntryPhoto(
        entryId: string,
        base64String: string
    ): Promise<CourierEntryResponse> {
        // Send the photo as a base64 string in a standard JSON payload.
        // This permanently bypasses React Native Android's notorious FormData network crash bugs!
        const response = await apiClient.put<{
            success: boolean;
            message: string;
            data: CourierEntryApiRow;
        }>(`/courier/${entryId}`, {
            pictureBase64: `data:image/jpeg;base64,${base64String}`
        });

        return {
            success: response.data.success,
            message: response.data.message,
            data: mapEntryRow(response.data.data),
        };
    }

    static async deleteEntry(entryId: string): Promise<GetCourierEntriesResponse> {
        await apiClient.delete(`/courier/${entryId}`);
        return this.getEntries();
    }
}
