"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courierMaster_controller_1 = require("./courierMaster.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = express_1.default.Router();
// CREATE
router.post("/add", auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)("SUPERADMIN"), courierMaster_controller_1.createCourierMaster);
// LIST
router.get("/list", auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)("SUPERADMIN", "USER"), courierMaster_controller_1.getCourierMaster);
// UPDATE
router.put("/update/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)("SUPERADMIN"), courierMaster_controller_1.updateCourierMaster);
// DELETE
router.delete("/delete/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)("SUPERADMIN"), courierMaster_controller_1.deleteCourierMaster);
exports.default = router;
//# sourceMappingURL=courierMaster.routes.js.map