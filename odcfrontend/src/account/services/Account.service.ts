import AsyncStorage from "@react-native-async-storage/async-storage";

import type { LoggedInUserDto } from "../dto/account.dto";

export class AccountService {
    static async getLoggedInUser(): Promise<LoggedInUserDto | null> {
        const storedUser = await AsyncStorage.getItem("loggedInUser");

        if (!storedUser) {
            return null;
        }

        return JSON.parse(storedUser) as LoggedInUserDto;
    }

    static async getAuthToken(): Promise<string | null> {
        return await AsyncStorage.getItem("authToken");
    }

    static async signOut(): Promise<void> {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("loggedInUser");
    }
}