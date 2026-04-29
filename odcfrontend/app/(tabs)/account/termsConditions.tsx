import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function TermsConditions() {
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
                    Terms & Conditions
                </Text>
            </View>

            <ScrollView
                className="flex-1 px-5 pt-6"
                showsVerticalScrollIndicator={false}
            >
                <View className="rounded-[28px] bg-white p-5 shadow-sm">
                    <Text className="mb-4 text-base font-extrabold text-gray-900">
                        Terms & Conditions
                    </Text>

                    <Text className="mb-4 text-sm leading-6 text-gray-600">
                        This application is intended for internal courier collection
                        management. Users must enter correct information while recording
                        courier details, quantity, collected-by name, and photo proof.
                    </Text>

                    <Text className="mb-4 text-sm leading-6 text-gray-600">
                        Users are responsible for the accuracy of the records submitted
                        through the application. Incorrect entries may affect operational
                        reporting and tracking.
                    </Text>

                    <Text className="mb-4 text-sm leading-6 text-gray-600">
                        Access to the application may be restricted based on user role.
                        Super Admin users may manage users and courier masters, while normal
                        users may access only permitted features.
                    </Text>

                    <Text className="text-sm leading-6 text-gray-600">
                        By using this application, you agree to use it only for authorized
                        business purposes and follow the applicable operational rules.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}