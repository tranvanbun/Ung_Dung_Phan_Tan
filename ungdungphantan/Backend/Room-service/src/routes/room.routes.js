import express from "express";
import upload from "../utils/multer.js";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "../modules/room.service.js";

const router = express.Router();

router.post("/", upload.array("images", 5), createRoom);
router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.put("/:id", upload.array("images", 5), updateRoom);
router.delete("/:id", deleteRoom);

export default router;
