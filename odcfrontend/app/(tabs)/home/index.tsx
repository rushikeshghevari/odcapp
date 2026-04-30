
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
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
    courierEntrySchema,
    type CourierEntryFormValues,
    type CourierEntryRow,
    type CourierRow,
} from "@/src/courierEntries/dto/courierEntry.dto";

import { CourierEntryService } from "@/src/courierEntries/services/CourierEntry.service";

export default function CourierEntries() {
    const [selectedCourier, setSelectedCourier] = useState("");
    const [showCourierDropdown, setShowCourierDropdown] = useState(false);
    const [boxQuantity, setBoxQuantity] = useState("");
    const [collectedBy, setCollectedBy] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [errors, setErrors] = useState<
        Partial<Record<keyof CourierEntryFormValues, string>>
    >({});

    const [courierList, setCourierList] = useState<CourierRow[]>([]);
    const [entries, setEntries] = useState<CourierEntryRow[]>([]);

    const [selectedEntry, setSelectedEntry] = useState<CourierEntryRow | null>(
        null
    );

    const [actionMenuVisible, setActionMenuVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    useFocusEffect(
        useCallback(() => {
            loadInitialData();
        }, [])
    );

    async function loadInitialData() {
        const couriers = await CourierEntryService.getCourierList();
        const entriesResponse = await CourierEntryService.getEntries();

        setCourierList(couriers);
        setEntries(entriesResponse.data);

        if (!phoneNumber) {
            const AsyncStorage =
                require("@react-native-async-storage/async-storage").default;

            const storedUser = await AsyncStorage.getItem("loggedInUser");

            if (storedUser) {
                const user = JSON.parse(storedUser);
                setPhoneNumber(user.phone);
            }
        }
    }

    async function resetForm() {
        setSelectedCourier("");
        setShowCourierDropdown(false);
        setBoxQuantity("");
        setCollectedBy("");
        setEditingId(null);
        setErrors({});

        const AsyncStorage =
            require("@react-native-async-storage/async-storage").default;

        const storedUser = await AsyncStorage.getItem("loggedInUser");

        if (storedUser) {
            const user = JSON.parse(storedUser);
            setPhoneNumber(user.phone);
        } else {
            setPhoneNumber("");
        }
    }

    function clearFieldError(fieldName: keyof CourierEntryFormValues) {
        setErrors((prev) => ({
            ...prev,
            [fieldName]: "",
        }));
    }

    function openActionMenu(entry: CourierEntryRow) {
        setSelectedEntry(entry);
        setActionMenuVisible(true);
    }

    function closeActionMenu() {
        setActionMenuVisible(false);
    }

    async function openCamera(entryId: string) {
        try {
            const permission = await ImagePicker.requestCameraPermissionsAsync();

            if (!permission.granted) {
                Alert.alert("Permission Required", "Please allow camera permission.");
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: false,
                quality: 0.7,
                base64: true,
            });

            if (result.canceled || !result.assets[0].base64) {
                return;
            }

            const imageBase64 = result.assets[0].base64;

            const response = await CourierEntryService.updateEntryPhoto(
                entryId,
                imageBase64
            );

            setEntries((prevEntries) =>
                prevEntries.map((entry) =>
                    entry.id === entryId ? response.data : entry
                )
            );
        } catch (error: any) {
            console.error("Camera/Upload Error:", error?.response?.data || error);

            Alert.alert(
                "Action Failed",
                error?.response?.data?.message ||
                error?.message ||
                "Could not launch camera or upload the photo. Please try again."
            );
        }
    }

    async function handleSubmit() {
        const payload: CourierEntryFormValues = {
            courierName: selectedCourier,
            boxQuantity,
            collectedBy,
            phoneNumber,
        };

        const result = courierEntrySchema.safeParse(payload);

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof CourierEntryFormValues, string>> =
                {};

            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as keyof CourierEntryFormValues;

                if (!fieldErrors[fieldName]) {
                    fieldErrors[fieldName] = issue.message;
                }
            });

            setErrors(fieldErrors);
            return;
        }

        setErrors({});

        if (editingId) {
            const response = await CourierEntryService.updateEntry(
                editingId,
                result.data
            );

            setEntries((prevEntries) =>
                prevEntries.map((entry) =>
                    entry.id === editingId ? response.data : entry
                )
            );

            Alert.alert("Success", response.message);
        } else {
            const response = await CourierEntryService.createEntry(result.data);

            setEntries((prevEntries) => [response.data, ...prevEntries]);

            Alert.alert("Success", response.message);
        }

        resetForm();
    }

    function handleViewEntry() {
        if (!selectedEntry) return;

        setActionMenuVisible(false);
        setViewModalVisible(true);
    }

    function handleEditEntry() {
        if (!selectedEntry) return;

        setActionMenuVisible(false);

        setSelectedCourier(selectedEntry.courierName);
        setBoxQuantity(selectedEntry.boxQuantity);
        setPhoneNumber(selectedEntry.phoneNumber);
        setCollectedBy(selectedEntry.collectedBy);
        setEditingId(selectedEntry.id);
        setErrors({});
    }

    function handleDeleteEntry() {
        if (!selectedEntry) return;

        setActionMenuVisible(false);

        Alert.alert(
            "Delete Entry",
            "Are you sure you want to delete this entry?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        const response = await CourierEntryService.deleteEntry(
                            selectedEntry.id
                        );

                        setEntries(response.data);

                        if (editingId === selectedEntry.id) {
                            resetForm();
                        }

                        setSelectedEntry(null);
                    },
                },
            ]
        );
    }

    const entryColumns: AppTableColumn<CourierEntryRow>[] = [
        {
            key: "courierName",
            title: "Courier",
            flex: 1.5,
            render: (entry) => (
                <View className="pr-2">
                    <Text
                        className="text-sm font-bold text-gray-900"
                        numberOfLines={1}
                    >
                        {entry.courierName}
                    </Text>

                    <Text className="mt-1 text-xs text-gray-500" numberOfLines={1}>
                        {entry.collectedBy}
                    </Text>
                </View>
            ),
        },
        {
            key: "boxQuantity",
            title: "Qty",
            width: 55,
            align: "center",
            render: (entry) => (
                <Text className="text-sm font-bold text-gray-900">
                    {entry.boxQuantity}
                </Text>
            ),
        },
        {
            key: "photo",
            title: "Photo",
            width: 65,
            align: "center",
            render: (entry) => (
                <Pressable
                    onPress={() => openCamera(entry.id)}
                    className="h-8 w-8 items-center justify-center rounded-full bg-blue-100"
                >
                    {entry.photoUri ? (
                        <Image
                            source={{ uri: entry.photoUri }}
                            className="h-8 w-8 rounded-full"
                        />
                    ) : (
                        <Ionicons name="camera-outline" size={17} color="#2563EB" />
                    )}
                </Pressable>
            ),
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-gray-100" edges={["top"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingTop: 12,
                        paddingBottom: 120,
                    }}
                >
                    <View className="mb-4 rounded-3xl bg-white px-5 py-4 shadow-md">
                        <View className="flex-row items-center">
                            <View
                                className="mr-4 items-center justify-center rounded-2xl bg-blue-100"
                                style={{ height: 52, width: 52 }}
                            >
                                <Ionicons name="cube-outline" size={28} color="#2563EB" />
                            </View>

                            <View className="flex-1">
                                <Text className="text-2xl font-extrabold text-gray-900">
                                    Courier Details
                                </Text>

                                <Text className="mt-1 text-sm font-medium text-gray-500">
                                    Add and manage daily courier entries
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="rounded-2xl bg-white p-4 shadow-md">
                        <Text className="mb-2 text-sm font-bold text-gray-700">
                            Select Courier
                        </Text>

                        <Pressable
                            onPress={() => setShowCourierDropdown(!showCourierDropdown)}
                            className="mb-1 flex-row items-center justify-between rounded-xl border bg-white px-4 py-3"
                            style={{
                                borderColor: errors.courierName
                                    ? "#ef4444"
                                    : "#d1d5db",
                            }}
                        >
                            <Text
                                className={
                                    selectedCourier
                                        ? "text-sm text-gray-900"
                                        : "text-sm text-gray-400"
                                }
                            >
                                {selectedCourier || "Select courier"}
                            </Text>

                            <Ionicons
                                name={
                                    showCourierDropdown
                                        ? "chevron-up-outline"
                                        : "chevron-down-outline"
                                }
                                size={22}
                                color="#6B7280"
                            />
                        </Pressable>

                        {errors.courierName ? (
                            <Text
                                className="mb-3 mt-1 text-sm"
                                style={{ color: "#ef4444" }}
                            >
                                {errors.courierName}
                            </Text>
                        ) : (
                            <View className="mb-3" />
                        )}

                        {showCourierDropdown && (
                            <View className="mb-4 rounded-xl border border-gray-200 bg-gray-50">
                                {courierList.map((courier, index) => (
                                    <Pressable
                                        key={courier.id}
                                        onPress={() => {
                                            setSelectedCourier(courier.name);
                                            setShowCourierDropdown(false);
                                            clearFieldError("courierName");
                                        }}
                                        className={
                                            index === courierList.length - 1
                                                ? "px-4 py-3"
                                                : "border-b border-gray-200 px-4 py-3"
                                        }
                                    >
                                        <Text className="text-sm text-gray-800">
                                            {courier.name}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}

                        <Text className="mb-2 text-sm font-bold text-gray-700">
                            Quantity of Box
                        </Text>

                        <TextInput
                            className="mb-1 rounded-xl border bg-white px-4 py-3 text-sm text-gray-900"
                            style={{
                                borderColor: errors.boxQuantity
                                    ? "#ef4444"
                                    : "#d1d5db",
                            }}
                            placeholder="Enter quantity of box"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="number-pad"
                            value={boxQuantity}
                            onChangeText={(text) => {
                                setBoxQuantity(text);
                                clearFieldError("boxQuantity");
                            }}
                        />

                        {errors.boxQuantity ? (
                            <Text
                                className="mb-3 mt-1 text-sm"
                                style={{ color: "#ef4444" }}
                            >
                                {errors.boxQuantity}
                            </Text>
                        ) : (
                            <View className="mb-3" />
                        )}

                        <Text className="mb-2 text-sm font-bold text-gray-700">
                            Collected By
                        </Text>

                        <TextInput
                            className="mb-1 rounded-xl border bg-white px-4 py-3 text-sm text-gray-900"
                            style={{
                                borderColor: errors.collectedBy
                                    ? "#ef4444"
                                    : "#d1d5db",
                            }}
                            placeholder="Enter collected by name"
                            placeholderTextColor="#9CA3AF"
                            value={collectedBy}
                            onChangeText={(text) => {
                                setCollectedBy(text);
                                clearFieldError("collectedBy");
                            }}
                        />

                        {errors.collectedBy ? (
                            <Text
                                className="mb-3 mt-1 text-sm"
                                style={{ color: "#ef4444" }}
                            >
                                {errors.collectedBy}
                            </Text>
                        ) : (
                            <View className="mb-3" />
                        )}

                        <Text className="mb-2 text-sm font-bold text-gray-700">
                            Phone Number
                        </Text>

                        <TextInput
                            className="mb-1 rounded-xl border bg-white px-4 py-3 text-sm text-gray-900"
                            style={{
                                borderColor: errors.phoneNumber
                                    ? "#ef4444"
                                    : "#d1d5db",
                            }}
                            placeholder="Enter phone number"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="number-pad"
                            maxLength={10}
                            value={phoneNumber}
                            onChangeText={(text) => {
                                setPhoneNumber(text);
                                clearFieldError("phoneNumber");
                            }}
                        />

                        {errors.phoneNumber ? (
                            <Text
                                className="mb-4 mt-1 text-sm"
                                style={{ color: "#ef4444" }}
                            >
                                {errors.phoneNumber}
                            </Text>
                        ) : (
                            <View className="mb-4" />
                        )}

                        <Pressable
                            onPress={handleSubmit}
                            className="rounded-xl bg-blue-600 py-4 active:opacity-80"
                        >
                            <Text className="text-center text-sm font-bold text-white">
                                {editingId ? "Update" : "Save"}
                            </Text>
                        </Pressable>
                    </View>

                    <View className="mt-4 mb-8 rounded-3xl bg-white p-3 shadow-md">
                        <View className="mb-3 flex-row items-center justify-between">
                            <View className="flex-1 pr-3">
                                <Text className="text-2xl font-extrabold text-gray-900">
                                    Recent Entries
                                </Text>
                            </View>
                            {/* 
                            <View className="rounded-full bg-blue-100 px-3 py-1">
                                <Text className="text-xs font-bold text-blue-600">
                                    {entries.length} Total
                                </Text>
                            </View> */}
                        </View>

                        <TableComponent<CourierEntryRow>
                            columns={entryColumns}
                            data={entries.slice(0, 6)}
                            keyExtractor={(entry) => entry.id.toString()}
                            onActionPress={openActionMenu}
                            emptyText="No courier entries found"
                            scrollBody={true}
                        />
                    </View>

                    <ThreeDotsActionMenu
                        visible={actionMenuVisible}
                        onClose={closeActionMenu}
                        onView={handleViewEntry}
                        onEdit={handleEditEntry}
                        onDelete={handleDeleteEntry}
                    />

                    <Modal
                        visible={viewModalVisible}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setViewModalVisible(false)}
                    >
                        <View className="flex-1 items-center justify-center bg-black/50 px-5">
                            <View className="w-full max-h-[85%] rounded-3xl bg-white p-5 shadow-xl">
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View className="mb-5 flex-row items-start justify-between">
                                        <View className="flex-1 pr-3">
                                            <Text className="text-xl font-bold text-gray-900">
                                                Courier Entry Details
                                            </Text>

                                            <Text className="mt-1 text-sm text-gray-500">
                                                Complete courier collection information
                                            </Text>
                                        </View>

                                        <Pressable
                                            onPress={() => setViewModalVisible(false)}
                                            className="h-9 w-9 items-center justify-center rounded-full bg-gray-100 active:opacity-70"
                                        >
                                            <Ionicons name="close" size={21} color="#374151" />
                                        </Pressable>
                                    </View>

                                    <View className="mb-5 items-center">
                                        {selectedEntry?.photoUri ? (
                                            <Image
                                                source={{ uri: selectedEntry.photoUri }}
                                                className="h-40 w-40 rounded-2xl bg-gray-100"
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <View className="h-40 w-40 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50">
                                                <Ionicons
                                                    name="image-outline"
                                                    size={38}
                                                    color="#9CA3AF"
                                                />

                                                <Text className="mt-2 text-center text-sm font-semibold text-gray-400">
                                                    No image available
                                                </Text>
                                            </View>
                                        )}
                                    </View>

                                    <View className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-2">
                                        <View className="border-b border-gray-200 py-3">
                                            <Text className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                Courier Name
                                            </Text>

                                            <Text className="mt-1 text-base font-bold text-gray-900">
                                                {selectedEntry?.courierName}
                                            </Text>
                                        </View>

                                        <View className="flex-row border-b border-gray-200 py-3">
                                            <View className="flex-1 pr-3">
                                                <Text className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                    Box Quantity
                                                </Text>

                                                <Text className="mt-1 text-base font-bold text-gray-900">
                                                    {selectedEntry?.boxQuantity} Boxes
                                                </Text>
                                            </View>

                                            <View className="flex-1 pl-3">
                                                <Text className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                    Phone Number
                                                </Text>

                                                <Text className="mt-1 text-base font-bold text-gray-900">
                                                    {selectedEntry?.phoneNumber}
                                                </Text>
                                            </View>
                                        </View>

                                        <View className="py-3">
                                            <Text className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                Collected By
                                            </Text>

                                            <Text className="mt-1 text-base font-bold text-gray-900">
                                                {selectedEntry?.collectedBy}
                                            </Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}