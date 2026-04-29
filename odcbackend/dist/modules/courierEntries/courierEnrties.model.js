"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierEntry = void 0;
const mongoose_1 = require("mongoose");
const CourierEntrySchema = new mongoose_1.Schema({
    // Selected courier from dropdown
    courierId: {
        type: mongoose_1.Types.ObjectId,
        ref: "courier_masters",
        required: true,
    },
    // Quantity of boxes
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    // Collected by person name
    collectedBy: {
        type: String,
        required: true,
        trim: true,
    },
    // Phone number
    contactNumber: {
        type: String,
        required: true,
        trim: true,
    },
    // Optional photo path / image URL
    picture: {
        type: String,
        default: null,
        trim: true,
    },
    // Entry date
    entryDate: {
        type: Date,
        default: Date.now,
    },
    // Soft delete support
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.CourierEntry = (0, mongoose_1.model)("CourierEntries", CourierEntrySchema);
//# sourceMappingURL=courierEnrties.model.js.map