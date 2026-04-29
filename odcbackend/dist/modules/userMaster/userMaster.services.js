"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserMasterService = exports.updateUserMasterService = exports.getUserMasterService = exports.createUserMasterService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userMaster_model_1 = require("./userMaster.model");
// CREATE USER
const createUserMasterService = async (name, phone, password, role) => {
    const existingUser = await userMaster_model_1.UserMaster.findOne({
        contactNumber: phone,
        is_deleted: false,
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const initialPassword = password || phone;
    const hashedPassword = await bcrypt_1.default.hash(initialPassword, 10);
    const user = await userMaster_model_1.UserMaster.create({
        name,
        contactNumber: phone,
        password: hashedPassword,
        original_password: initialPassword,
        role: role || "USER",
        is_signup: true,
        is_deleted: false,
    });
    return user;
};
exports.createUserMasterService = createUserMasterService;
// GET ALL USERS
const getUserMasterService = async () => {
    return await userMaster_model_1.UserMaster.find({ is_deleted: false }).sort({
        createdAt: -1,
    });
};
exports.getUserMasterService = getUserMasterService;
// UPDATE USER
const updateUserMasterService = async (id, name, phone, role) => {
    return await userMaster_model_1.UserMaster.findByIdAndUpdate(id, { name, contactNumber: phone, role }, { new: true });
};
exports.updateUserMasterService = updateUserMasterService;
// SOFT DELETE USER
const deleteUserMasterService = async (id) => {
    return await userMaster_model_1.UserMaster.findByIdAndUpdate(id, { is_deleted: true }, { new: true });
};
exports.deleteUserMasterService = deleteUserMasterService;
//# sourceMappingURL=userMaster.services.js.map