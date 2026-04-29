"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const courierEntries_controller_1 = require("./courierEntries.controller");
const router = (0, express_1.Router)();
// ======================
// MULTER CONFIG
// ======================
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(process.cwd(), "public/uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// ======================
// ROUTES
// ======================
router.post("/", upload.single("picture"), courierEntries_controller_1.createCourierEntry);
router.get("/", courierEntries_controller_1.getCourierEntries);
router.get("/:id", courierEntries_controller_1.getCourierEntryById);
router.put("/:id", upload.single("picture"), courierEntries_controller_1.updateCourierEntry);
router.delete("/:id", courierEntries_controller_1.deleteCourierEntry);
exports.default = router;
//# sourceMappingURL=courierEntries.routes.js.map