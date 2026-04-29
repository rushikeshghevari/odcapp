"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("./auth.middleware");
const router = express_1.default.Router();
// Register (only SUPERADMIN)
router.post("/register", auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)("SUPERADMIN"), auth_controller_1.registerUser);
// Signup (public)
router.post("/signup", auth_controller_1.signupUser);
// Login (public)
router.post("/login", auth_controller_1.loginUser);
// DELETE USER (SUPERADMIN ONLY)
router.delete("/users/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)("SUPERADMIN"), auth_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map