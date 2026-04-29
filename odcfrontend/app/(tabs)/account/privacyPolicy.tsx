import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function PrivacyPolicy() {
    return (
        <View className="flex-1 bg-[#F8F9FA]">
            <View className="flex-row items-center border-b border-gray-100 bg-white px-5 pb-5 pt-14">
                <Pressable
                    onPress={() => router.replace("/(tabs)/account")}
                    className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-gray-100"
                >
                    <Ionicons name="arrow-back" size={22} color="#111827" />
                </Pressable>
                <Text className="text-xl font-extrabold text-gray-900">
                    Privacy Policy
                </Text>
            </View>

            <ScrollView
                className="flex-1 px-5 pt-6"
                showsVerticalScrollIndicator={false}
            >
                <View className="rounded-[28px] bg-white p-5 shadow-sm">
                    <Text className="mb-4 text-base font-extrabold text-gray-900">
                        Privacy Policy
                    </Text>

                    <Text className="mb-4 text-sm leading-6 text-gray-600">
                        We respect your privacy and are committed to protecting your
                        personal information. This application may collect basic details
                        such as user name, mobile number, courier records, box quantity,
                        collected-by name, and collection photos for operational purposes.
                    </Text>

                    <Text className="mb-4 text-sm leading-6 text-gray-600">
                        The information entered in this application is used for courier
                        collection tracking, internal reporting, user management, and record
                        maintenance.
                    </Text>

                    <Text className="mb-4 text-sm leading-6 text-gray-600">
                        Photos captured through the application are used only as proof of
                        courier collection and may be stored securely as part of business
                        records.
                    </Text>

                    <Text className="text-sm leading-6 text-gray-600">
                        By using this application, you agree that submitted information may
                        be stored and used for authorized business and operational purposes.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}