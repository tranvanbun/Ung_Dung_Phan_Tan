import express from "express";
import upload from "../utils/multer.js";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getRoomsByOwner,
  updateRoomStatus,
  getLatestRooms,
} from "../modules/room.service.js";

const router = express.Router();

// ✅ Đặt route cụ thể trước route có params
router.get("/latest", getLatestRooms);
router.get("/owner/:ownerId", getRoomsByOwner);

// ✅ Route chung
router.get("/", getAllRooms);
router.post("/", upload.array("images", 5), createRoom);

// ✅ Sửa từ /search/:id thành /:id để khớp với frontend
router.get("/:id", getRoomById);
router.put("/:id", upload.array("images", 5), updateRoom);
router.delete("/:id", deleteRoom);
router.patch("/:id/status", updateRoomStatus);

export default router;
