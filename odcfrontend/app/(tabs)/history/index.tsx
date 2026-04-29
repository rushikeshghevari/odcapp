import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    StatusBar,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHistory, getMonthName, getYear, formatDate } from "../../../src/history/hooks/useHistory";
import type { OptionRow } from "../../../src/history/dto/history.dto";

type SelectPopupProps = {
    visible: boolean;
    title: string;
    options: OptionRow[];
    selectedValue: string;
    onSelect: (value: string) => void;
    onClose: () => void;
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
            <View className="flex-1 items-center justify-center bg-black/30 px-6">
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

    const listHeader = (
        <View>
            <View className="mb-5">
                {/* Header */}
                <View className="mb-4 rounded-3xl bg-white px-5 py-4 shadow-md">
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

                <Text className="mt-1 text-sm font-medium text-slate-500">
                    Courier collection records
                </Text>
            </View>

            <View className="mb-4 w-[92%] self-center rounded-3xl bg-white p-4 shadow-sm">
                <View className="mb-4 flex-row items-center justify-between">
                    <Text className="text-sm font-extrabold text-slate-900">
                        Filter Records
                    </Text>

                    <Pressable onPress={handleClearFilter}>
                        <Text className="text-xs font-extrabold text-blue-600">
                            Clear
                        </Text>
                    </Pressable>
                </View>

                <View className="flex-row gap-3">
                    <Pressable
                        onPress={() => setMonthPopupVisible(true)}
                        className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
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

                            <Ionicons name="chevron-down" size={16} color="#64748b" />
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={() => setYearPopupVisible(true)}
                        className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
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

                            <Ionicons name="chevron-down" size={16} color="#64748b" />
                        </View>
                    </Pressable>
                </View>

                <Pressable
                    onPress={handleApplyFilter}
                    className="mt-4 flex-row items-center justify-center rounded-2xl bg-blue-600 py-3.5"
                >
                    <Ionicons name="search-outline" size={18} color="white" />

                    <Text className="ml-2 text-sm font-extrabold text-white">
                        Apply Filter
                    </Text>
                </Pressable>
            </View>

            <View className="mb-2 flex-row items-center justify-between px-1">
                <Text className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Records
                </Text>

                <Text className="text-xs font-bold text-slate-400">
                    {filterMonth === "All" ? "All Months" : filterMonth} /{" "}
                    {filterYear === "All" ? "All Years" : filterYear}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-slate-100" edges={["top"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />

            <FlatList
                data={filteredHistory}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={listHeader}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 16,
                    paddingBottom: 110,
                }}
                ListEmptyComponent={
                    <View className="mt-4 items-center rounded-3xl bg-white py-12 shadow-sm">
                        <Ionicons name="folder-open-outline" size={36} color="#cbd5e1" />

                        <Text className="mt-3 text-sm font-extrabold text-slate-400">
                            No records found
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View className="mb-3 rounded-3xl bg-white p-4 shadow-sm">
                        <View className="flex-row items-start justify-between">
                            <View className="flex-1 pr-3">
                                <Text
                                    className="text-base font-extrabold text-slate-950"
                                    numberOfLines={2}
                                >
                                    {item.courierName}
                                </Text>

                                <View className="mt-2 flex-row items-center">
                                    <Ionicons name="person-outline" size={14} color="#64748b" />

                                    <Text
                                        className="ml-1.5 text-xs font-bold text-slate-500"
                                        numberOfLines={1}
                                    >
                                        {item.collectedBy}
                                    </Text>
                                </View>
                            </View>

                            <View className="items-end">
                                <View className="rounded-2xl bg-blue-50 px-3 py-1.5">
                                    <Text className="text-sm font-extrabold text-blue-700">
                                        {item.boxQuantity} Box
                                    </Text>
                                </View>

                                {item.hasPhoto && (
                                    <View className="mt-2 flex-row items-center rounded-full bg-emerald-50 px-2 py-1">
                                        <Ionicons name="image-outline" size={12} color="#059669" />

                                        <Text className="ml-1 text-[10px] font-extrabold text-emerald-600">
                                            Photo
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>

                        <View className="mt-4 flex-row items-center justify-between border-t border-slate-100 pt-3">
                            <View className="flex-row items-center">
                                <Ionicons name="calendar-outline" size={15} color="#64748b" />

                                <Text className="ml-1.5 text-xs font-extrabold text-slate-600">
                                    {formatDate(item.date)}
                                </Text>
                            </View>

                            <Text className="text-xs font-bold text-slate-400">
                                {getMonthName(item.date)} {getYear(item.date)}
                            </Text>
                        </View>
                    </View>
                )}
            />

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
        </SafeAreaView>
    );
}
