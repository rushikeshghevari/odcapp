"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourierEntryService = exports.updateCourierEntryService = exports.getCourierEntryByIdService = exports.getCourierEntriesService = exports.createCourierEntryService = void 0;
const courierEnrties_model_1 = require("./courierEnrties.model");
// CREATE
const createCourierEntryService = async (data) => {
    return await courierEnrties_model_1.CourierEntry.create(data);
};
exports.createCourierEntryService = createCourierEntryService;
// GET ALL WITH PAGINATION
const getCourierEntriesService = async (filterData) => {
    const { year, month, page = 1, limit = 10, } = filterData;
    const filter = { isDeleted: false };
    const yearValue = year ? Number(year) : undefined;
    // YEAR FILTER
    if (yearValue) {
        const start = new Date(yearValue, 0, 1);
        const end = new Date(yearValue, 11, 31, 23, 59, 59);
        filter.entryDate = {
            $gte: start,
            $lte: end,
        };
    }
    // MONTH FILTER
    if (yearValue && month) {
        const start = new Date(yearValue, month - 1, 1);
        const end = new Date(yearValue, month, 0, 23, 59, 59);
        filter.entryDate = {
            $gte: start,
            $lte: end,
        };
    }
    const skip = (page - 1) * limit;
    const total = await courierEnrties_model_1.CourierEntry.countDocuments(filter);
    const data = await courierEnrties_model_1.CourierEntry.find(filter)
        .populate("courierId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    return {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        pageSize: limit,
        data,
    };
};
exports.getCourierEntriesService = getCourierEntriesService;
// GET BY ID
const getCourierEntryByIdService = async (id) => {
    return await courierEnrties_model_1.CourierEntry.findById(id).populate("courierId");
};
exports.getCourierEntryByIdService = getCourierEntryByIdService;
// UPDATE
const updateCourierEntryService = async (id, data) => {
    return await courierEnrties_model_1.CourierEntry.findByIdAndUpdate(id, data, { new: true });
};
exports.updateCourierEntryService = updateCourierEntryService;
// DELETE
const deleteCourierEntryService = async (id) => {
    return await courierEnrties_model_1.CourierEntry.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
exports.deleteCourierEntryService = deleteCourierEntryService;
//# sourceMappingURL=courierEntries.services.js.map