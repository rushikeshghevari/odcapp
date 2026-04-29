import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
    return (
        <SafeAreaView className="flex-1 bg-gray-100" edges={["top"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: 16,
                    paddingBottom: 112,
                }}
            >
                <Text className="mb-8 text-3xl font-bold text-gray-900">
                    Settings
                </Text>

                <Pressable
                    onPress={() => router.push("/settings/userMaster" as any)}
                    className="mb-6 min-h-40 flex-row items-center rounded-3xl bg-white p-6 shadow-md active:opacity-80"
                >
                    <View className="mr-5 h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <Ionicons name="people-outline" size={32} color="#16A34A" />
                    </View>

                    <View className="flex-1">
                        <Text className="text-xl font-bold text-gray-900">
                            User Master
                        </Text>
                        <Text className="mt-2 text-base text-gray-500">
                            Add and manage registered users
                        </Text>
                    </View>
                </Pressable>

                <Pressable
                    onPress={() => router.push("/settings/courierMaster" as any)}
                    className="mb-6 min-h-40 flex-row items-center rounded-3xl bg-white p-6 shadow-md active:opacity-80"
                >
                    <View className="mr-5 h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                        <Ionicons
                            name="briefcase-outline"
                            size={32}
                            color="#2563EB"
                        />
                    </View>

                    <View className="flex-1">
                        <Text className="text-xl font-bold text-gray-900">
                            Courier Master
                        </Text>
                        <Text className="mt-2 text-base text-gray-500">
                            Add and manage courier details
                        </Text>
                    </View>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}
