"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const courierMaster_routes_1 = __importDefault(require("./modules/courierMaster/courierMaster.routes"));
const userMaster_routes_1 = __importDefault(require("./modules/userMaster/userMaster.routes"));
const courierEntries_routes_1 = __importDefault(require("./modules/courierEntries/courierEntries.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// ======================
// BODY PARSERS
// ======================
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ======================
// STATIC FOLDER (IMPORTANT)
// ======================
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../public/uploads")));
// ======================
// DB CONNECT
// ======================
(0, db_1.connectDB)();
// ======================
// ROUTES
// ======================
app.use("/api/auth", auth_routes_1.default);
app.use("/api/courier-master", courierMaster_routes_1.default);
app.use("/api/user-master", userMaster_routes_1.default);
app.use("/api/courier", courierEntries_routes_1.default);
// ======================
app.get("/", (req, res) => {
    res.send("Courier Backend Running...");
});
// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map