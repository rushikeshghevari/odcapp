"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserMaster = exports.updateUserMaster = exports.getUserMaster = exports.createUserMaster = void 0;
const userMaster_services_1 = require("./userMaster.services");
// CREATE USER
const createUserMaster = async (req, res) => {
    try {
        const { name, phone, password, role } = req.body;
        const data = await (0, userMaster_services_1.createUserMasterService)(name, phone, password, role);
        return res.status(201).json({
            success: true,
            message: "User created successfully",
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
exports.createUserMaster = createUserMaster;
// GET ALL USERS
const getUserMaster = async (_req, res) => {
    try {
        const data = await (0, userMaster_services_1.getUserMasterService)();
        return res.status(200).json({
            success: true,
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
exports.getUserMaster = getUserMaster;
// UPDATE USER
const updateUserMaster = async (req, res) => {
    try {
        let { id } = req.params;
        // ✅ FIX: handle string | string[]
        if (Array.isArray(id)) {
            id = id[0];
        }
        const { name, phone, role } = req.body;
        const data = await (0, userMaster_services_1.updateUserMasterService)(id, name, phone, role);
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
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
exports.updateUserMaster = updateUserMaster;
// DELETE USER
const deleteUserMaster = async (req, res) => {
    try {
        let { id } = req.params;
        // ✅ FIX: handle string | string[]
        if (Array.isArray(id)) {
            id = id[0];
        }
        const data = await (0, userMaster_services_1.deleteUserMasterService)(id);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
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
exports.deleteUserMaster = deleteUserMaster;
//# sourceMappingURL=userMaster.controller.js.map