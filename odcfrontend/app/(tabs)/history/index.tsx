
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TableComponent, {
    type AppTableColumn,
} from "@/components/TableComponent";

import ThreeDotsActionMenu from "@/components/ThreeDotsActionMenu";

import {
    useHistory,
    formatDate,
} from "../../../src/history/hooks/useHistory";

import type { OptionRow } from "../../../src/history/dto/history.dto";

type SelectPopupProps = {
    visible: boolean;
    title: string;
    options: OptionRow[];
    selectedValue: string;
    onSelect: (value: string) => void;
    onClose: () => void;
};

type HistoryRecord = {
    id: string;
    date: string;
    courierName: string;
    boxQuantity: string;
    collectedBy: string;

    phoneNumber?: string;
    userMobileNo?: string;

    photoUri?: string;
    photo?: string;
    image?: string;
    photoUrl?: string;
    imageBase64?: string;
    photoBase64?: string;
    base64?: string;

    hasPhoto?: boolean;
    createdAt?: string;
    uuid4?: string;
};

function SelectPopup({
    visible,
    title,
    options,
    selectedValue,
    onSelect,
    onClose,
}: SelectPopupProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 items-center justify-center bg-black/40 px-6">
                <View className="w-full rounded-3xl bg-white p-4 shadow-xl">
                    <View className="mb-4 flex-row items-center justify-between">
                        <Text className="text-base font-extrabold text-slate-900">
                            {title}
                        </Text>

                        <Pressable
                            onPress={onClose}
                            className="h-9 w-9 items-center justify-center rounded-full bg-slate-100"
                        >
                            <Ionicons name="close" size={20} color="#334155" />
                        </Pressable>
                    </View>

                    <FlatList
                        data={options}
                        keyExtractor={(item) => item.value}
                        showsVerticalScrollIndicator
                        style={{ maxHeight: 310 }}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => {
                            const active = item.value === selectedValue;

                            return (
                                <Pressable
                                    onPress={() => {
                                        onSelect(item.value);
                                        onClose();
                                    }}
                                    className={`mb-2 flex-row items-center justify-between rounded-2xl border px-4 py-3 ${active
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-slate-200 bg-white"
                                        }`}
                                >
                                    <Text
                                        className={`text-sm ${active
                                            ? "font-extrabold text-blue-700"
                                            : "font-semibold text-slate-700"
                                            }`}
                                    >
                                        {item.label}
                                    </Text>

                                    {active && (
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={20}
                                            color="#2563eb"
                                        />
                                    )}
                                </Pressable>
                            );
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
}

export default function History() {
    const {
        filteredHistory,
        selectedMonth,
        selectedYear,
        filterMonth,
        filterYear,
        monthOptions,
        yearOptions,
        selectedMonthLabel,
        selectedYearLabel,
        setSelectedMonth,
        setSelectedYear,
        handleApplyFilter,
        handleClearFilter,
    } = useHistory();

    const [monthPopupVisible, setMonthPopupVisible] = useState(false);
    const [yearPopupVisible, setYearPopupVisible] = useState(false);

    const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(
        null
    );

    const [actionMenuVisible, setActionMenuVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [imagePreviewVisible, setImagePreviewVisible] = useState(false);

    function getPhotoUri(record: HistoryRecord | null) {
        if (!record) return "";

        const photo =
            record.photoUri ||
            record.photo ||
            record.image ||
            record.photoUrl ||
            record.imageBase64 ||
            record.photoBase64 ||
            record.base64 ||
            "";

        if (!photo) return "";

        if (photo.startsWith("http")) return photo;
        if (photo.startsWith("file://")) return photo;
        if (photo.startsWith("data:image")) return photo;

        return `data:image/jpeg;base64,${photo}`;
    }

    function openActionMenu(record: HistoryRecord) {
        setSelectedRecord(record);
        setActionMenuVisible(true);
    }

    function closeActionMenu() {
        setActionMenuVisible(false);
    }

    function handleViewRecord() {
        if (!selectedRecord) return;

        console.log("Selected History Record:", selectedRecord);
        console.log("Selected Photo URI:", getPhotoUri(selectedRecord));

        setActionMenuVisible(false);
        setViewModalVisible(true);
    }

    const historyColumns: AppTableColumn<HistoryRecord>[] = [
        {
            key: "courierName",
            title: "Courier",
            flex: 1.5,
            render: (item) => (
                <View className="pr-2">
                    <Text
                        className="text-sm font-bold text-slate-900"
                        numberOfLines={1}
                    >
                        {item.courierName}
                    </Text>

                    <Text
                        className="mt-1 text-xs font-medium text-slate-500"
                        numberOfLines={1}
                    >
                        {item.collectedBy}
                    </Text>
                </View>
            ),
        },
        {
            key: "boxQuantity",
            title: "Qty",
            width: 55,
            align: "center",
            render: (item) => (
                <View className="rounded-full bg-blue-50 px-3 py-1">
                    <Text className="text-xs font-extrabold text-blue-700">
                        {item.boxQuantity}
                    </Text>
                </View>
            ),
        },
        {
            key: "date",
            title: "Date",
            width: 90,
            align: "right",
            render: (item) => (
                <Text
                    className="text-xs font-semibold text-slate-500"
                    numberOfLines={1}
                >
                    {formatDate(item.createdAt || item.date || "")}
                </Text>
            ),
        },
    ];

    const tableData = filteredHistory as unknown as HistoryRecord[];
    const selectedPhotoUri = getPhotoUri(selectedRecord);

    return (
        <SafeAreaView className="flex-1 bg-slate-100" edges={["top"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 12,
                    paddingBottom: 120,
                }}
            >
                <View className="mb-4 rounded-3xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
                    <View className="flex-row items-center">
                        <View
                            className="mr-4 items-center justify-center rounded-2xl bg-blue-100"
                            style={{ height: 52, width: 52 }}
                        >
                            <Ionicons name="time-outline" size={28} color="#2563EB" />
                        </View>

                        <View className="flex-1">
                            <Text className="text-2xl font-extrabold text-gray-900">
                                History
                            </Text>

                            <Text className="mt-1 text-sm font-medium text-gray-500">
                                View and filter previous courier records
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="mb-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
                    <View className="mb-4 flex-row items-center justify-between">
                        <View>
                            <Text className="text-sm font-extrabold text-slate-900">
                                Filter Records
                            </Text>

                            <Text className="mt-1 text-xs font-medium text-slate-400">
                                Select month and year
                            </Text>
                        </View>

                        <Pressable
                            onPress={handleClearFilter}
                            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 active:opacity-80"
                        >
                            <Text className="text-xs font-extrabold text-blue-600">
                                Clear
                            </Text>
                        </Pressable>
                    </View>

                    <View className="flex-row gap-3">
                        <Pressable
                            onPress={() => setMonthPopupVisible(true)}
                            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 active:opacity-90"
                        >
                            <Text className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                                Month
                            </Text>

                            <View className="mt-1 flex-row items-center justify-between">
                                <Text
                                    className="text-sm font-extrabold text-slate-900"
                                    numberOfLines={1}
                                >
                                    {selectedMonthLabel}
                                </Text>

                                <Ionicons
                                    name="chevron-down"
                                    size={16}
                                    color="#64748b"
                                />
                            </View>
                        </Pressable>

                        <Pressable
                            onPress={() => setYearPopupVisible(true)}
                            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 active:opacity-90"
                        >
                            <Text className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                                Year
                            </Text>

                            <View className="mt-1 flex-row items-center justify-between">
                                <Text
                                    className="text-sm font-extrabold text-slate-900"
                                    numberOfLines={1}
                                >
                                    {selectedYearLabel}
                                </Text>

                                <Ionicons
                                    name="chevron-down"
                                    size={16}
                                    color="#64748b"
                                />
                            </View>
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={handleApplyFilter}
                        className="mt-4 flex-row items-center justify-center rounded-2xl bg-blue-600 py-3.5 active:opacity-80"
                    >
                        <Ionicons name="search-outline" size={18} color="white" />

                        <Text className="ml-2 text-sm font-extrabold text-white">
                            Apply Filter
                        </Text>
                    </Pressable>
                </View>

                <View className="mb-2 flex-row items-center justify-between px-1">
                    <View className="flex-1 pr-3">
                        <Text className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                            Records
                        </Text>

                        <Text className="mt-1 text-xs font-medium text-slate-400">
                            {tableData.length} records found
                        </Text>
                    </View>

                    <View className="rounded-full border border-slate-200 bg-white px-3 py-2">
                        <Text className="text-[11px] font-bold text-slate-500">
                            {filterMonth === "All" ? "All Months" : filterMonth} /{" "}
                            {filterYear === "All" ? "All Years" : filterYear}
                        </Text>
                    </View>
                </View>

                <View className="rounded-3xl border border-slate-100 bg-white p-2 shadow-sm">
                    <TableComponent<HistoryRecord>
                        columns={historyColumns}
                        data={tableData}
                        keyExtractor={(item) => item.id.toString()}
                        onActionPress={openActionMenu}
                        emptyText="No courier records found"
                        scrollBody={true}
                        maxBodyHeight={420}
                    />
                </View>

                <SelectPopup
                    visible={monthPopupVisible}
                    title="Select Month"
                    options={monthOptions}
                    selectedValue={selectedMonth}
                    onSelect={setSelectedMonth}
                    onClose={() => setMonthPopupVisible(false)}
                />

                <SelectPopup
                    visible={yearPopupVisible}
                    title="Select Year"
                    options={yearOptions}
                    selectedValue={selectedYear}
                    onSelect={setSelectedYear}
                    onClose={() => setYearPopupVisible(false)}
                />

                <ThreeDotsActionMenu
                    visible={actionMenuVisible}
                    onClose={closeActionMenu}
                    onView={handleViewRecord}
                />

                <Modal
                    visible={viewModalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setViewModalVisible(false)}
                >
                    <View className="flex-1 items-center justify-center bg-black/50 px-5">
                        <View className="w-full max-h-[88%] rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View className="mb-5 flex-row items-start justify-between">
                                    <View className="flex-1 pr-3">
                                        <Text className="text-xl font-extrabold text-gray-900">
                                            Courier Record Details
                                        </Text>

                                        <Text className="mt-1 text-sm font-medium text-gray-500">
                                            Complete courier collection information
                                        </Text>
                                    </View>

                                    <Pressable
                                        onPress={() => setViewModalVisible(false)}
                                        className="h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 active:opacity-70"
                                    >
                                        <Ionicons
                                            name="close"
                                            size={21}
                                            color="#374151"
                                        />
                                    </Pressable>
                                </View>

                                <View className="mb-5 items-center">
                                    <Pressable
                                        onPress={() => {
                                            if (selectedPhotoUri) {
                                                setImagePreviewVisible(true);
                                            }
                                        }}
                                        className="rounded-3xl bg-slate-100 p-2"
                                    >
                                        {selectedPhotoUri ? (
                                            <Image
                                                source={{ uri: selectedPhotoUri }}
                                                className="h-44 w-44 rounded-2xl bg-gray-100"
                                                resizeMode="cover"
                                                onError={(error) => {
                                                    console.log(
                                                        "Image Load Error:",
                                                        error.nativeEvent
                                                    );
                                                    console.log(
                                                        "Image URI:",
                                                        selectedPhotoUri
                                                    );
                                                }}
                                            />
                                        ) : (
                                            <View className="h-44 w-44 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50">
                                                <Ionicons
                                                    name="image-outline"
                                                    size={42}
                                                    color="#9CA3AF"
                                                />

                                                <Text className="mt-2 text-center text-sm font-semibold text-gray-400">
                                                    No image available
                                                </Text>
                                            </View>
                                        )}
                                    </Pressable>
                                </View>

                                <View className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                                    <View className="border-b border-gray-200 bg-white px-4 py-4">
                                        <Text className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Courier Name
                                        </Text>

                                        <Text className="mt-1 text-base font-extrabold text-gray-900">
                                            {selectedRecord?.courierName || "-"}
                                        </Text>
                                    </View>

                                    <View className="flex-row border-b border-gray-200 bg-white px-4 py-4">
                                        <View className="flex-1 pr-3">
                                            <Text className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                Box Quantity
                                            </Text>

                                            <Text className="mt-1 text-base font-extrabold text-gray-900">
                                                {selectedRecord?.boxQuantity || "-"} Boxes
                                            </Text>
                                        </View>

                                        <View className="flex-1 pl-3">
                                            <Text className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                Phone Number
                                            </Text>

                                            <Text className="mt-1 text-base font-extrabold text-gray-900">
                                                {selectedRecord?.phoneNumber ||
                                                    selectedRecord?.userMobileNo ||
                                                    "-"}
                                            </Text>
                                        </View>
                                    </View>

                                    <View className="border-b border-gray-200 bg-white px-4 py-4">
                                        <Text className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Collected By
                                        </Text>

                                        <Text className="mt-1 text-base font-extrabold text-gray-900">
                                            {selectedRecord?.collectedBy || "-"}
                                        </Text>
                                    </View>

                                    <View className="bg-white px-4 py-4">
                                        <Text className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Date
                                        </Text>

                                        <Text className="mt-1 text-base font-extrabold text-gray-900">
                                            {formatDate(
                                                selectedRecord?.createdAt ||
                                                selectedRecord?.date ||
                                                ""
                                            )}
                                        </Text>
                                    </View>
                                </View>

                                <Pressable
                                    onPress={() => setViewModalVisible(false)}
                                    className="mt-5 rounded-2xl bg-blue-600 py-4 shadow-sm active:opacity-80"
                                >
                                    <Text className="text-center text-sm font-extrabold text-white">
                                        Close
                                    </Text>
                                </Pressable>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={imagePreviewVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setImagePreviewVisible(false)}
                >
                    <View className="flex-1 items-center justify-center bg-black/90 px-4">
                        <Pressable
                            onPress={() => setImagePreviewVisible(false)}
                            className="absolute right-5 top-12 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/20"
                        >
                            <Ionicons name="close" size={24} color="#ffffff" />
                        </Pressable>

                        {selectedPhotoUri ? (
                            <Image
                                source={{ uri: selectedPhotoUri }}
                                className="h-[78%] w-full rounded-2xl"
                                resizeMode="contain"
                            />
                        ) : null}
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}
