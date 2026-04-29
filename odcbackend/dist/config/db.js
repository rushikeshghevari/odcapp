"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function connectDB() {
    try {
        console.log("inside connect to db");
        mongoose_1.default.set("strictQuery", true);
        await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log("Mongo DB Connected", process.env.MONGO_URL);
    }
    catch (error) {
        console.error("Mongo DB Connection Error:", error);
        process.exit(1);
    }
}
//# sourceMappingURL=db.js.map