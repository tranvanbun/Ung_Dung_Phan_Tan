import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

// Lấy tất cả phòng
export const getAllRooms = async (req, res) => {
  const rooms = await prisma.room.findMany();
  res.json(rooms);
};

// Tạo mới phòng
export const createRoom = async (req, res) => {
  const { title, description, price, area, address, imageUrls, ownerId } = req.body;
  const room = await prisma.room.create({
    data: { title, description, price, area, address, imageUrls, ownerId },
  });
  res.status(201).json(room);
};

// Lấy phòng theo id
export const getRoomById = async (req, res) => {
  const room = await prisma.room.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!room) return res.status(404).json({ message: "Room not found" });
  res.json(room);
};

// Cập nhật phòng
export const updateRoom = async (req, res) => {
  const room = await prisma.room.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(room);
};

// Xóa phòng
export const deleteRoom = async (req, res) => {
  await prisma.room.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ message: "Room deleted successfully" });
};
