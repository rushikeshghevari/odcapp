"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.signupUserService = exports.registerUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userMaster_model_1 = require("../userMaster/userMaster.model");
// Register Service
const registerUserService = async (name, phone, password, role) => {
    const existingUser = await userMaster_model_1.UserMaster.findOne({
        contactNumber: phone,
        is_deleted: false,
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await userMaster_model_1.UserMaster.create({
        name,
        contactNumber: phone,
        password: hashedPassword,
        original_password: password,
        role: role || "USER",
        is_signup: false,
    });
    return user;
};
exports.registerUserService = registerUserService;
// Signup Service
const signupUserService = async (phone, password) => {
    const existingUser = await userMaster_model_1.UserMaster.findOne({
        contactNumber: phone,
        is_deleted: false,
    });
    if (!existingUser) {
        throw new Error("User doesnt exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    await userMaster_model_1.UserMaster.updateOne({ contactNumber: phone }, {
        $set: {
            password: hashedPassword,
            original_password: password,
            is_signup: true,
        },
    });
    return await userMaster_model_1.UserMaster.findOne({
        contactNumber: phone,
        is_deleted: false,
    });
};
exports.signupUserService = signupUserService;
// Login Service
const loginUserService = async (phone, password) => {
    const user = await userMaster_model_1.UserMaster.findOne({
        contactNumber: phone,
        is_deleted: false,
    });
    if (!user) {
        throw new Error("phone number doesnt exists");
    }
    const isPasswordMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        return null;
    }
    return user;
};
exports.loginUserService = loginUserService;
//# sourceMappingURL=auth.sevices.js.map