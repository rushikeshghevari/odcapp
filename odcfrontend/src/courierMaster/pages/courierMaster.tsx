// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useEffect, useState } from "react";
// import {
//     Alert,
//     KeyboardAvoidingView,
//     Platform,
//     Pressable,
//     ScrollView,
//     Text,
//     TextInput,
//     View,
// } from "react-native";

// import TableComponent, {
//     type AppTableColumn,
// } from "@/components/TableComponent";
// import ThreeDotsActionMenu from "@/components/ThreeDotsActionMenu";

// import {
//     courierMasterSchema,
//     type CourierMasterFormValues,
//     type CourierMasterRow,
// } from "../dto/courierMaster.dto";

// import { CourierMasterService } from "../services/CourierMaster.service";

// export default function CourierMasterScreen() {
//     const [courierName, setCourierName] = useState("");
//     const [mobileNo, setMobileNo] = useState("");
//     const [isFocused, setIsFocused] = useState<string | null>(null);

//     const [courierMasters, setCourierMasters] = useState<CourierMasterRow[]>([]);
//     const [selectedCourier, setSelectedCourier] =
//         useState<CourierMasterRow | null>(null);

//     const [actionMenuVisible, setActionMenuVisible] = useState(false);
//     const [editingId, setEditingId] = useState<number | null>(null);

//     useEffect(() => {
//         loadCourierMasters();
//     }, []);

//     async function loadCourierMasters() {
//         const response = await CourierMasterService.getCourierMasters();
//         setCourierMasters(response.data);
//     }

//     function openActionMenu(courier: CourierMasterRow) {
//         setSelectedCourier(courier);
//         setActionMenuVisible(true);
//     }

//     function closeActionMenu() {
//         setActionMenuVisible(false);
//     }

//     async function handleSubmit() {
//         const payload: CourierMasterFormValues = {
//             courierName,
//             mobileNo,
//         };

//         const result = courierMasterSchema.safeParse(payload);

//         if (!result.success) {
//             const firstError =
//                 result.error.issues[0]?.message || "Invalid courier data";

//             Alert.alert("Validation Error", firstError);
//             return;
//         }

//         if (editingId) {
//             const response = await CourierMasterService.updateCourierMaster(
//                 editingId,
//                 result.data
//             );

//             setCourierMasters((prev) =>
//                 prev.map((item) =>
//                     item.id === editingId ? response.data : item
//                 )
//             );

//             Alert.alert("Success", response.message);
//             setEditingId(null);
//         } else {
//             const response = await CourierMasterService.createCourierMaster(
//                 result.data
//             );

//             setCourierMasters((prev) => [response.data, ...prev]);

//             Alert.alert("Success", response.message);
//         }

//         setCourierName("");
//         setMobileNo("");
//     }

//     // function handleViewCourier() {
//     //     if (!selectedCourier) return;

//     //     Alert.alert(
//     //         "Courier Details",
//     //         `Courier Name: ${selectedCourier.courierName}\nMobile No: ${selectedCourier.mobileNo}`
//     //     );
//     // }

//     function handleEditCourier() {
//         if (!selectedCourier) return;

//         setCourierName(selectedCourier.courierName);
//         setMobileNo(selectedCourier.mobileNo);
//         setEditingId(selectedCourier.id);
//     }

//     function handleDeleteCourier() {
//         if (!selectedCourier) return;

//         Alert.alert(
//             "Confirm Delete",
//             `Are you sure you want to delete ${selectedCourier.courierName}?`,
//             [
//                 {
//                     text: "Cancel",
//                     style: "cancel",
//                 },
//                 {
//                     text: "Delete",
//                     style: "destructive",
//                     onPress: async () => {
//                         const response =
//                             await CourierMasterService.deleteCourierMaster(
//                                 selectedCourier.id
//                             );

//                         setCourierMasters(response.data);

//                         if (editingId === selectedCourier.id) {
//                             setEditingId(null);
//                             setCourierName("");
//                             setMobileNo("");
//                         }

//                         setSelectedCourier(null);
//                     },
//                 },
//             ]
//         );
//     }

//     const courierColumns: AppTableColumn<CourierMasterRow>[] = [
//         {
//             key: "srNo",
//             title: "No",
//             width: 40,
//             render: (_item, index) => (
//                 <Text className="text-sm font-semibold text-gray-500">
//                     {index + 1}
//                 </Text>
//             ),
//         },
//         {
//             key: "courierName",
//             title: "Courier Name",
//             flex: 1,
//             render: (item) => (
//                 <Text
//                     className="text-sm font-bold text-gray-900"
//                     numberOfLines={1}
//                 >
//                     {item.courierName}
//                 </Text>
//             ),
//         },
//         {
//             key: "mobileNo",
//             title: "Mobile",
//             width: 95,
//             render: (item) => (
//                 <Text className="text-xs font-semibold text-gray-600">
//                     {item.mobileNo}
//                 </Text>
//             ),
//         },
//     ];

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//             className="flex-1 bg-[#FDFDFD]"
//         >
//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 className="flex-1 px-6 pt-16"
//             >
//                 {/* Header */}
//                 <View className="mb-8 flex-row items-center justify-between">
//                     <Pressable
//                         onPress={() => router.replace("/settings" as any)}
//                         className="h-12 w-12 items-center justify-center rounded-2xl bg-white border border-gray-100 shadow-sm active:bg-gray-50"
//                     >
//                         <Ionicons name="close" size={24} color="#111827" />
//                     </Pressable>

//                     <Text className="text-xl font-bold text-gray-900">
//                         Courier Master
//                     </Text>

//                     <View className="w-12" />
//                 </View>

//                 {/* Form Card */}
//                 <View className="rounded-[32px] bg-white p-6 shadow-2xl shadow-gray-200 border border-gray-50">
//                     <Text className="mb-6 text-sm font-semibold text-gray-400 uppercase tracking-widest text-center">
//                         Courier Details
//                     </Text>

//                     {/* Courier Name Input */}
//                     <View className="mb-5">
//                         <View
//                             className={`flex-row items-center rounded-2xl border-2 px-4 py-1 ${isFocused === "name"
//                                 ? "border-blue-600 bg-white"
//                                 : "border-gray-50 bg-gray-50"
//                                 }`}
//                         >
//                             <Ionicons
//                                 name="business-outline"
//                                 size={20}
//                                 color={isFocused === "name" ? "#2563EB" : "#9CA3AF"}
//                             />

//                             <TextInput
//                                 className="flex-1 px-3 py-4 text-lg font-semibold text-gray-900"
//                                 placeholder="Courier Name"
//                                 placeholderTextColor="#9CA3AF"
//                                 value={courierName}
//                                 onFocus={() => setIsFocused("name")}
//                                 onBlur={() => setIsFocused(null)}
//                                 onChangeText={setCourierName}
//                             />
//                         </View>
//                     </View>

//                     {/* Mobile Input */}
//                     <View className="mb-8">
//                         <View
//                             className={`flex-row items-center rounded-2xl border-2 px-4 py-1 ${isFocused === "phone"
//                                 ? "border-blue-600 bg-white"
//                                 : "border-gray-50 bg-gray-50"
//                                 }`}
//                         >
//                             <Ionicons
//                                 name="call-outline"
//                                 size={20}
//                                 color={isFocused === "phone" ? "#2563EB" : "#9CA3AF"}
//                             />

//                             <TextInput
//                                 className="flex-1 px-3 py-4 text-lg font-semibold text-gray-900"
//                                 placeholder="Mobile Number"
//                                 placeholderTextColor="#9CA3AF"
//                                 keyboardType="number-pad"
//                                 maxLength={10}
//                                 value={mobileNo}
//                                 onFocus={() => setIsFocused("phone")}
//                                 onBlur={() => setIsFocused(null)}
//                                 onChangeText={setMobileNo}
//                             />
//                         </View>
//                     </View>

//                     {/* Submit Button */}
//                     <Pressable
//                         onPress={handleSubmit}
//                         className="flex-row items-center justify-center rounded-2xl bg-blue-600 py-5 shadow-lg shadow-blue-200 active:bg-blue-700 active:scale-[0.98]"
//                     >
//                         <Text className="text-lg font-bold text-white">
//                             {editingId ? "Update Courier" : "Register Courier"}
//                         </Text>

//                         <Ionicons
//                             name="chevron-forward"
//                             size={20}
//                             color="white"
//                             className="ml-2"
//                         />
//                     </Pressable>
//                 </View>

//                 <Text className="mt-8 text-center text-gray-400 text-xs">
//                     Please ensure all details are correct before submitting.
//                 </Text>

//                 {/* Registered Couriers Table */}
//                 <View className="mt-10 mb-10">
//                     <View className="mb-4 flex-row items-center justify-between">
//                         <Text className="text-xl font-bold text-gray-900">
//                             Registered Couriers
//                         </Text>

//                         <Text className="text-sm font-semibold text-blue-600">
//                             {courierMasters.length} Total
//                         </Text>
//                     </View>

//                     <TableComponent
//                         columns={courierColumns}
//                         data={courierMasters}
//                         keyExtractor={(item) => item.id.toString()}
//                         onActionPress={openActionMenu}
//                         emptyText="No couriers found"
//                     />
//                 </View>
//             </ScrollView>

//             <ThreeDotsActionMenu
//                 visible={actionMenuVisible}
//                 onClose={closeActionMenu}
//                 // onView={handleViewCourier}
//                 onEdit={handleEditCourier}
//                 onDelete={handleDeleteCourier}
//             />
//         </KeyboardAvoidingView>
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

import TableComponent, {
    type AppTableColumn,
} from "@/components/TableComponent";

import ThreeDotsActionMenu from "@/components/ThreeDotsActionMenu";
import {
    courierMasterSchema,
    type CourierMasterFormValues,
    type CourierMasterRow,
} from "@/src/courierMaster/dto/courierMaster.dto";
import { useCourierMaster } from "@/src/courierMaster/hooks/useCourierMaster";

export default function CourierMaster() {
    const {
        courierMasters: courierList,
        createCourierMaster,
        updateCourierMaster,
        deleteCourierMaster,
        isLoading,
    } = useCourierMaster();

    const [courierName, setCourierName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [isFocused, setIsFocused] = useState<string | null>(null);
    const [selectedCourier, setSelectedCourier] =
        useState<CourierMasterRow | null>(null);

    const [actionMenuVisible, setActionMenuVisible] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const courierColumns: AppTableColumn<CourierMasterRow>[] = [
        {
            key: "srNo",
            title: "No",
            width: 40,
            render: (_item, index) => (
                <Text className="text-sm font-semibold text-gray-500">
                    {index + 1}
                </Text>
            ),
        },
        {
            key: "name",
            title: "Courier Name",
            flex: 1,
            render: (item) => (
                <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>
                    {item.courierName}
                </Text>
            ),
        },
        {
            key: "mobileNo",
            title: "Mobile",
            width: 95,
            render: (item) => (
                <Text className="text-xs font-semibold text-gray-600">
                    {item.mobileNo}
                </Text>
            ),
        },
    ];

    function openActionMenu(courier: CourierMasterRow) {
        setSelectedCourier(courier);
        setActionMenuVisible(true);
    }

    function closeActionMenu() {
        setActionMenuVisible(false);
    }

    function resetForm() {
        setCourierName("");
        setMobileNo("");
        setEditingId(null);
    }

    async function handleSubmit() {
        const payload: CourierMasterFormValues = {
            courierName,
            mobileNo,
        };

        const result = courierMasterSchema.safeParse(payload);

        if (!result.success) {
            const firstError =
                result.error.issues[0]?.message || "Invalid courier details";

            Alert.alert("Validation Error", firstError);
            return;
        }

        if (editingId) {
            const response = await updateCourierMaster(editingId, result.data);

            if (!response) {
                Alert.alert("Error", "Failed to update courier");
                return;
            }

            Alert.alert("Success", response.message);
        } else {
            const response = await createCourierMaster(result.data);

            if (!response) {
                Alert.alert("Error", "Failed to create courier");
                return;
            }

            Alert.alert("Success", response.message);
        }

        resetForm();
    }

    function handleEditCourier() {
        if (!selectedCourier) return;

        setActionMenuVisible(false);
        setCourierName(selectedCourier.courierName);
        setMobileNo(selectedCourier.mobileNo);
        setEditingId(selectedCourier.id);
    }

    function handleDeleteCourier() {
        if (!selectedCourier) return;

        setActionMenuVisible(false);

        Alert.alert(
            "Confirm Delete",
            `Are you sure you want to delete ${selectedCourier.courierName}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await deleteCourierMaster(selectedCourier.id);

                        if (editingId === selectedCourier.id) {
                            resetForm();
                        }

                        setSelectedCourier(null);
                    },
                },
            ]
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-100" edges={["top"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="flex-1"
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingTop: 12,
                        paddingBottom: 120,
                    }}
                    nestedScrollEnabled
                >
                {/* Back Button */}
                <View className="mb-4 flex-row items-center justify-between">
                    <Pressable
                        onPress={() => router.replace("/settings" as any)}
                        className="h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm active:opacity-80"
                    >
                        <Ionicons name="arrow-back" size={22} color="#111827" />
                    </Pressable>

                    <View className="flex-1" />

                    <View className="w-11" />
                </View>

                {/* Header */}
                <View className="mb-6 rounded-3xl bg-white px-5 py-5 shadow-md">
                    <View className="flex-row items-center">
                        <View
                            className="mr-4 items-center justify-center rounded-2xl bg-blue-100"
                            style={{ height: 52, width: 52 }}
                        >
                            <Ionicons name="briefcase-outline" size={28} color="#2563EB" />
                        </View>

                        <View className="flex-1">
                            <Text className="text-2xl font-extrabold text-gray-900">
                                Courier Master
                            </Text>

                            <Text className="mt-1 text-sm font-medium text-gray-500">
                                Add and manage courier details
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Form */}
                <View className="rounded-3xl bg-white p-5 shadow-md">
                    <Text className="mb-5 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
                        Courier Details
                    </Text>

                    <View className="mb-5">
                        <View
                            className={`flex-row items-center rounded-2xl border px-4 ${isFocused === "courierName"
                                ? "border-blue-600 bg-white"
                                : "border-gray-200 bg-gray-50"
                                }`}
                        >
                            <Ionicons
                                name="briefcase-outline"
                                size={20}
                                color={isFocused === "courierName" ? "#2563EB" : "#9CA3AF"}
                            />

                            <TextInput
                                className="flex-1 px-3 py-4 text-base font-semibold text-gray-900"
                                placeholder="Courier Name"
                                placeholderTextColor="#9CA3AF"
                                value={courierName}
                                onFocus={() => setIsFocused("courierName")}
                                onBlur={() => setIsFocused(null)}
                                onChangeText={setCourierName}
                            />
                        </View>
                    </View>

                    <View className="mb-6">
                        <View
                            className={`flex-row items-center rounded-2xl border px-4 ${isFocused === "mobileNo"
                                ? "border-blue-600 bg-white"
                                : "border-gray-200 bg-gray-50"
                                }`}
                        >
                            <Ionicons
                                name="call-outline"
                                size={20}
                                color={isFocused === "mobileNo" ? "#2563EB" : "#9CA3AF"}
                            />

                            <TextInput
                                className="flex-1 px-3 py-4 text-base font-semibold text-gray-900"
                                placeholder="Mobile Number"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="number-pad"
                                maxLength={10}
                                value={mobileNo}
                                onFocus={() => setIsFocused("mobileNo")}
                                onBlur={() => setIsFocused(null)}
                                onChangeText={setMobileNo}
                            />
                        </View>
                    </View>

                    <Pressable
                        onPress={handleSubmit}
                        disabled={isLoading}
                        className="rounded-2xl bg-blue-600 py-4 active:opacity-80"
                    >
                        <Text className="text-center text-base font-bold text-white">
                            {isLoading
                                ? "Saving..."
                                : editingId
                                    ? "Update Courier"
                                    : "Save Courier"}
                        </Text>
                    </Pressable>
                </View>

                {/* Courier List with Vertical Scroller */}
                <View className="mt-6 rounded-3xl bg-white p-4 shadow-md">
                    <View className="mb-4 flex-row items-center justify-between">
                        <View className="flex-1 pr-3">
                            <Text className="text-xl font-bold text-gray-900">
                                Courier List
                            </Text>

                        </View>

                        <View className="rounded-full bg-blue-100 px-3 py-1">
                            <Text className="text-xs font-bold text-blue-600">
                                {courierList.length} Total
                            </Text>
                        </View>
                    </View>


                    <TableComponent<CourierMasterRow>
                        columns={courierColumns}
                        data={courierList}
                        keyExtractor={(item) => item.id}
                        onActionPress={openActionMenu}
                        emptyText="No couriers found"
                        scrollBody={true}
                    />

                </View>
                </ScrollView>

                <ThreeDotsActionMenu
                    visible={actionMenuVisible}
                    onClose={closeActionMenu}
                    onEdit={handleEditCourier}
                    onDelete={handleDeleteCourier}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
