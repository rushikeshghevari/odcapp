"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userMaster_controller_1 = require("./userMaster.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = express_1.default.Router();
router.post("/add", auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)("SUPERADMIN"), userMaster_controller_1.createUserMaster);
router.get("/list", auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)("SUPERADMIN"), userMaster_controller_1.getUserMaster);
router.put("/update/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)("SUPERADMIN"), userMaster_controller_1.updateUserMaster);
router.delete("/delete/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)("SUPERADMIN"), userMaster_controller_1.deleteUserMaster);
exports.default = router;
//# sourceMappingURL=userMaster.routes.js.map