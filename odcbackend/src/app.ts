import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { connectDB } from "./config/db";

import authRoutes from "./modules/auth/auth.routes";
import courierMasterRoutes from "./modules/courierMaster/courierMaster.routes";
import userMasterRoutes from "./modules/userMaster/userMaster.routes";
import courierEntryRoutes from "./modules/courierEntries/courierEntries.routes";

dotenv.config();

const app = express();
app.use(cors());

// ======================
// BODY PARSERS
// ======================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ======================
// STATIC FOLDER (IMPORTANT)
// ======================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../public/uploads"))
);

// ======================
// DB CONNECT
// ======================
connectDB();

// ======================
// ROUTES
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/courier-master", courierMasterRoutes);
app.use("/api/user-master", userMasterRoutes);
app.use("/api/courier", courierEntryRoutes);

// ======================
app.get("/", (req, res) => {
  res.send("Courier Backend Running...");
});

// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});