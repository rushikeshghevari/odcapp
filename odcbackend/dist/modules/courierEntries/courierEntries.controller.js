"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourierEntry = exports.updateCourierEntry = exports.getCourierEntryById = exports.getCourierEntries = exports.createCourierEntry = void 0;
const courierEntries_services_1 = require("./courierEntries.services");
// CREATE
const createCourierEntry = async (req, res) => {
    try {
        const data = {
            ...req.body,
            picture: req.file ? req.file.path : null,
        };
        const result = await (0, courierEntries_services_1.createCourierEntryService)(data);
        res.status(201).json({
            success: true,
            message: "Courier entry created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createCourierEntry = createCourierEntry;
// GET ALL WITH PAGINATION
const getCourierEntries = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const year = typeof req.query.year === "string"
            ? req.query.year
            : undefined;
        const month = typeof req.query.month === "string"
            ? Number(req.query.month)
            : undefined;
        const result = await (0, courierEntries_services_1.getCourierEntriesService)({
            year,
            month,
            page,
            limit,
        });
        res.json({
            success: true,
            total: result.total,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
            pageSize: result.pageSize,
            data: result.data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getCourierEntries = getCourierEntries;
// GET BY ID
const getCourierEntryById = async (req, res) => {
    try {
        const result = await (0, courierEntries_services_1.getCourierEntryByIdService)(req.params.id);
        res.json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getCourierEntryById = getCourierEntryById;
// UPDATE
const updateCourierEntry = async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.picture = req.file.path;
        }
        const result = await (0, courierEntries_services_1.updateCourierEntryService)(req.params.id, data);
        res.json({
            success: true,
            message: "Updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateCourierEntry = updateCourierEntry;
// DELETE
const deleteCourierEntry = async (req, res) => {
    try {
        await (0, courierEntries_services_1.deleteCourierEntryService)(req.params.id);
        res.json({
            success: true,
            message: "Deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteCourierEntry = deleteCourierEntry;
//# sourceMappingURL=courierEntries.controller.js.map