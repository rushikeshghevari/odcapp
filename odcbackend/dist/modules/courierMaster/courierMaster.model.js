"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courier_masters = void 0;
const mongoose_1 = require("mongoose");
const CourierMasterSchema = new mongoose_1.Schema({
    company_name: {
        type: String,
        required: true,
        trim: true,
    },
    contact_number: {
        type: String,
        required: true,
        trim: true,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.courier_masters = (0, mongoose_1.model)("courier_masters", CourierMasterSchema);
//# sourceMappingURL=courierMaster.model.js.map