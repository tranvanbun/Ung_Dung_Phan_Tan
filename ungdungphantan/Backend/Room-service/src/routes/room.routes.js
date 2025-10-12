import express from "express";
import * as roomService from "../modules/room.service.js";

const router = express.Router();

router.get("/", roomService.getAllRooms);
router.post("/", roomService.createRoom);
router.get("/:id", roomService.getRoomById);
router.put("/:id", roomService.updateRoom);
router.delete("/:id", roomService.deleteRoom);

export default router;
