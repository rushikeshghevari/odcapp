"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourierMaster = exports.updateCourierMaster = exports.getCourierMaster = exports.createCourierMaster = void 0;
const courierMaster_services_1 = require("./courierMaster.services");
// CREATE
const createCourierMaster = async (req, res) => {
    try {
        const { company_name, contact_number } = req.body;
        if (!company_name || !contact_number) {
            return res.status(400).json({
                success: false,
                message: "company_name and contact_number are required",
            });
        }
        const data = await (0, courierMaster_services_1.createCourierMasterService)(company_name, contact_number);
        return res.status(201).json({
            success: true,
            message: "Courier company created successfully",
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createCourierMaster = createCourierMaster;
// GET ALL
const getCourierMaster = async (req, res) => {
    try {
        const data = await (0, courierMaster_services_1.getCourierMasterService)();
        return res.status(200).json({
            success: true,
            message: "Courier companies fetched successfully",
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getCourierMaster = getCourierMaster;
// UPDATE
const updateCourierMaster = async (req, res) => {
    try {
        const id = req.params.id;
        const { company_name, contact_number } = req.body;
        if (!company_name || !contact_number) {
            return res.status(400).json({
                success: false,
                message: "company_name and contact_number are required",
            });
        }
        const data = await (0, courierMaster_services_1.updateCourierMasterService)(id, company_name, contact_number);
        return res.status(200).json({
            success: true,
            message: "Courier company updated successfully",
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateCourierMaster = updateCourierMaster;
// DELETE
const deleteCourierMaster = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await (0, courierMaster_services_1.deleteCourierMasterService)(id);
        return res.status(200).json({
            success: true,
            message: "Courier company deleted successfully",
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteCourierMaster = deleteCourierMaster;
//# sourceMappingURL=courierMaster.controller.js.map