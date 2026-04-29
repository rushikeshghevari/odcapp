"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMaster = exports.Role = void 0;
const mongoose_1 = require("mongoose");
var Role;
(function (Role) {
    Role["SUPERADMIN"] = "SUPERADMIN";
    Role["USER"] = "USER";
})(Role || (exports.Role = Role = {}));
const UserMasterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    contactNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    original_password: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER,
    },
    is_signup: {
        type: Boolean,
        default: false,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.UserMaster = (0, mongoose_1.model)("user_masters", UserMasterSchema);
//# sourceMappingURL=userMaster.model.js.map