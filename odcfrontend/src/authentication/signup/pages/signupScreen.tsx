// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useState } from "react";
// import {
//     Alert,
//     KeyboardAvoidingView,
//     Platform,
//     Pressable,
//     ScrollView,
//     StatusBar,
//     Text,
//     TextInput,
//     View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { signupSchema } from "../dto/signup.dto";
// import { useSignup } from "../hooks/useSignup";

// export default function SignupScreen() {
//     const { signup, isLoading } = useSignup();

//     const [mobileNo, setMobileNo] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     async function handleSignup() {
//         const result = signupSchema.safeParse({
//             mobileNo,
//             password,
//         });

//         if (!result.success) {
//             const firstError =
//                 result.error.issues[0]?.message || "Invalid signup details";

//             Alert.alert("Validation Error", firstError);
//             return;
//         }

//         const response = await signup(result.data);

//         if (!response?.success) {
//             Alert.alert("Signup Failed", "Unable to sign up with these details.");
//             return;
//         }

//         Alert.alert("Success", response.message);

//         setMobileNo("");
//         setPassword("");

//         router.replace("/auth/login" as any);
//     }

//     return (
//         <SafeAreaView className="flex-1 bg-gray-100" edges={["top"]}>
//             <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

//             <KeyboardAvoidingView
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 className="flex-1"
//             >
//                 <ScrollView
//                     keyboardShouldPersistTaps="handled"
//                     contentContainerStyle={{
//                         flexGrow: 1,
//                         justifyContent: "center",
//                         paddingHorizontal: 20,
//                         paddingVertical: 24,
//                     }}
//                     showsVerticalScrollIndicator={false}
//                 >
//                     <View className="rounded-xl bg-white p-5">
//                         <Text className="mb-6 text-center text-2xl font-bold text-gray-900">
//                             Sign Up
//                         </Text>

//                         <Text className="mb-2 text-base font-medium text-gray-700">
//                             Mobile Number
//                         </Text>

//                         <TextInput
//                             className="mb-4 rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900"
//                             placeholder="Enter mobile number"
//                             placeholderTextColor="#9CA3AF"
//                             keyboardType="number-pad"
//                             value={mobileNo}
//                             onChangeText={setMobileNo}
//                             maxLength={10}
//                         />

//                         <Text className="mb-2 text-base font-medium text-gray-700">
//                             Password
//                         </Text>

//                         <View className="mb-5 flex-row items-center rounded-lg border border-gray-300 px-4">
//                             <TextInput
//                                 className="flex-1 py-3 pr-3 text-base text-gray-900"
//                                 placeholder="Enter password"
//                                 placeholderTextColor="#9CA3AF"
//                                 secureTextEntry={!showPassword}
//                                 value={password}
//                                 onChangeText={setPassword}
//                             />

//                             <Pressable onPress={() => setShowPassword(!showPassword)}>
//                                 <Ionicons
//                                     name={showPassword ? "eye-off-outline" : "eye-outline"}
//                                     size={22}
//                                     color="#374151"
//                                 />
//                             </Pressable>
//                         </View>

//                         <Pressable
//                             onPress={handleSignup}
//                             disabled={isLoading}
//                             className={`rounded-lg py-3 ${isLoading ? "bg-blue-400" : "bg-blue-600"
//                                 }`}
//                         >
//                             <Text className="text-center text-base font-semibold text-white">
//                                 {isLoading ? "Signing up..." : "Sign Up"}
//                             </Text>
//                         </Pressable>

//                         <View className="mt-5 flex-row justify-center">
//                             <Text className="text-sm text-gray-600">
//                                 Already have an account?{" "}
//                             </Text>

//                             <Pressable onPress={() => router.push("/auth/login" as any)}>
//                                 <Text className="text-sm font-bold text-blue-600">
//                                     Login
//                                 </Text>
//                             </Pressable>
//                         </View>
//                     </View>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// }

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { signupSchema } from "../dto/signup.dto";
import { useSignup } from "../hooks/useSignup";

export default function SignupScreen() {
    const { signup, isLoading } = useSignup();

    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState<{
        mobileNo?: string;
        password?: string;
    }>({});

    function handleMobileNoChange(text: string) {
        setMobileNo(text);

        setErrors((prev) => ({
            ...prev,
            mobileNo: "",
        }));
    }

    function handlePasswordChange(text: string) {
        setPassword(text);

        setErrors((prev) => ({
            ...prev,
            password: "",
        }));
    }

    async function handleSignup() {
        const result = signupSchema.safeParse({
            mobileNo,
            password,
        });

        if (!result.success) {
            const fieldErrors: {
                mobileNo?: string;
                password?: string;
            } = {};

            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as "mobileNo" | "password";

                if (!fieldErrors[fieldName]) {
                    fieldErrors[fieldName] = issue.message;
                }
            });

            setErrors(fieldErrors);
            return;
        }

        setErrors({});

        const response = await signup(result.data);

        if (!response?.success) {
            Alert.alert("Signup Failed", "Unable to sign up with these details.");
            return;
        }

        Alert.alert("Success", response.message);

        setMobileNo("");
        setPassword("");

        router.replace("/auth/login" as any);
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-100" edges={["top"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        paddingHorizontal: 20,
                        paddingVertical: 24,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="rounded-xl bg-white p-5">
                        <Text className="mb-6 text-center text-2xl font-bold text-gray-900">
                            Sign Up
                        </Text>

                        <Text className="mb-2 text-base font-medium text-gray-700">
                            Mobile Number
                        </Text>

                        <TextInput
                            className="rounded-lg border px-4 py-3 text-base text-gray-900"
                            style={{
                                borderColor: errors.mobileNo ? "#ef4444" : "#d1d5db",
                            }}
                            placeholder="Enter mobile number"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="number-pad"
                            value={mobileNo}
                            onChangeText={handleMobileNoChange}
                            maxLength={10}
                        />

                        {errors.mobileNo ? (
                            <Text
                                className="mb-4 mt-1 text-sm"
                                style={{ color: "#ef4444" }}
                            >
                                {errors.mobileNo}
                            </Text>
                        ) : (
                            <View className="mb-4" />
                        )}

                        <Text className="mb-2 text-base font-medium text-gray-700">
                            Password
                        </Text>

                        <View
                            className="flex-row items-center rounded-lg border px-4"
                            style={{
                                borderColor: errors.password ? "#ef4444" : "#d1d5db",
                            }}
                        >
                            <TextInput
                                className="flex-1 py-3 pr-3 text-base text-gray-900"
                                placeholder="Enter password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={handlePasswordChange}
                            />

                            <Pressable onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={22}
                                    color="#374151"
                                />
                            </Pressable>
                        </View>

                        {errors.password ? (
                            <Text
                                className="mb-5 mt-1 text-sm"
                                style={{ color: "#ef4444" }}
                            >
                                {errors.password}
                            </Text>
                        ) : (
                            <View className="mb-5" />
                        )}

                        <Pressable
                            onPress={handleSignup}
                            disabled={isLoading}
                            className={`rounded-lg py-3 ${isLoading ? "bg-blue-400" : "bg-blue-600"
                                }`}
                        >
                            <Text className="text-center text-base font-semibold text-white">
                                {isLoading ? "Signing up..." : "Sign Up"}
                            </Text>
                        </Pressable>

                        <View className="mt-5 flex-row justify-center">
                            <Text className="text-sm text-gray-600">
                                Already have an account?{" "}
                            </Text>

                            <Pressable onPress={() => router.push("/auth/login" as any)}>
                                <Text className="text-sm font-bold text-blue-600">
                                    Login
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}