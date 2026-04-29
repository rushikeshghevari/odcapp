"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.loginUser = exports.signupUser = exports.registerUser = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const auth_sevices_1 = require("./auth.sevices");
const userMaster_model_1 = require("../userMaster/userMaster.model");
// =======================
// REGISTER CONTROLLER
// =======================
const registerUser = async (req, res) => {
    try {
        const { name, phone, password, role } = req.body;
        if (!name || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, phone and password are required",
            });
        }
        const user = await (0, auth_sevices_1.registerUserService)(name, phone, password, role);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Registration failed",
        });
    }
};
exports.registerUser = registerUser;
// =======================
// SIGNUP CONTROLLER
// =======================
const signupUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        if (!phone || !password) {
            return res.status(400).json({
                success: false,
                message: "phone and password are required",
            });
        }
        const user = await (0, auth_sevices_1.signupUserService)(phone, password);
        return res.status(201).json({
            success: true,
            message: "Signup successful",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Signup failed",
        });
    }
};
exports.signupUser = signupUser;
// =======================
// LOGIN CONTROLLER
// =======================
const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        if (!phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Phone and password are required",
            });
        }
        const user = await (0, auth_sevices_1.loginUserService)(phone, password);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const token = jwt.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: {
                id: user._id,
                name: user.name,
                phone: user.contactNumber,
                role: user.role,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Login failed",
        });
    }
};
exports.loginUser = loginUser;
// =======================
// DELETE USER CONTROLLER
// =======================
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const user = await userMaster_model_1.UserMaster.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        await userMaster_model_1.UserMaster.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Delete failed",
        });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=auth.controller.js.map