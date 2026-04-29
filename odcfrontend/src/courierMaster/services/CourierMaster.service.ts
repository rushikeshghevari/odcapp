import { apiClient } from "@/src/api/apiClient";

import type {
    CourierMasterFormValues,
    CourierMasterResponse,
    CourierMasterRow,
    GetCourierMastersResponse,
} from "../dto/courierMaster.dto";

type CourierMasterApiRow = {
    _id: string;
    company_name: string;
    contact_number: string;
};

function mapCourierMasterRow(item: CourierMasterApiRow): CourierMasterRow {
    return {
        id: item._id,
        courierName: item.company_name,
        mobileNo: item.contact_number,
    };
}

export class CourierMasterService {
    static async getCourierMasters(): Promise<GetCourierMastersResponse> {
        const response = await apiClient.get<{
            data: CourierMasterApiRow[];
        }>("/courier-master/list");

        const rows = response.data.data.map(mapCourierMasterRow);

        return {
            data: rows,
            totalRecords: rows.length,
            page: 1,
            limit: rows.length || 10,
            totalPages: 1,
        };
    }

    static async createCourierMaster(
        payload: CourierMasterFormValues
    ): Promise<CourierMasterResponse> {
        const response = await apiClient.post<{
            success: boolean;
            message: string;
            data: CourierMasterApiRow;
        }>("/courier-master/add", {
            company_name: payload.courierName,
            contact_number: payload.mobileNo,
        });

        return {
            success: response.data.success,
            message: response.data.message,
            data: mapCourierMasterRow(response.data.data),
        };
    }

    static async updateCourierMaster(
        id: string,
        payload: CourierMasterFormValues
    ): Promise<CourierMasterResponse> {
        const response = await apiClient.put<{
            success: boolean;
            message: string;
            data: CourierMasterApiRow;
        }>(`/courier-master/update/${id}`, {
            company_name: payload.courierName,
            contact_number: payload.mobileNo,
        });

        return {
            success: response.data.success,
            message: response.data.message,
            data: mapCourierMasterRow(response.data.data),
        };
    }

    static async deleteCourierMaster(
        id: string
    ): Promise<GetCourierMastersResponse> {
        await apiClient.delete(`/courier-master/delete/${id}`);
        return this.getCourierMasters();
    }
}
