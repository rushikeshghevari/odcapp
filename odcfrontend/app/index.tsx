// import { Redirect } from "expo-router";

// export default function Index() {

//     return <Redirect href={"/auth/login" as any} />;
//     //return <Redirect href={"/(tabs)/settings" as any} />;
// }

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
    useEffect(() => {
        async function checkLoginStatus() {
            const token = await AsyncStorage.getItem("authToken");
            const loggedInUser = await AsyncStorage.getItem("loggedInUser");

            console.log("Startup Token:", token);
            console.log("Startup User:", loggedInUser);

            if (token && loggedInUser) {
                router.replace("/(tabs)/home" as any);
            } else {
                router.replace("/auth/login" as any);
            }
        }

        checkLoginStatus();
    }, []);

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <ActivityIndicator size="large" />
        </View>
    );
}