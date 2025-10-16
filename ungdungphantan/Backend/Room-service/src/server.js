import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import roomRoutes from "./routes/room.routes.js";
import contract from "./routes/contract.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Sửa từ /rooms thành /api/rooms để khớp với frontend
app.use("/api/rooms", roomRoutes);
app.use("/api/contracts", contract);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", service: "Room Service", timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: `Route ${req.url} not found` });
});

app.listen(PORT, () => {
  console.log(`🚀 Room-service running on port http://localhost:${PORT}`);
});
