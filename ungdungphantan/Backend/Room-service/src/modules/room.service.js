import { PrismaClient } from "../generated/prisma/index.js";
import cloudinary from "../utils/cloudinary.js";

const prisma = new PrismaClient();


export const createRoom = async (req, res) => {
  try {
    const { title, description, price, area, address, ownerId } = req.body;
    let uploadedUrls = [];

    // Upload ảnh (nếu có)
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "rooms" },
            (err, result) => {
              if (err) reject(err);
              else {
                uploadedUrls.push(result.secure_url);
                resolve(result);
              }
            }
          );
          stream.end(file.buffer);
        });
      }
    }

    const room = await prisma.room.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        area: parseFloat(area),
        address,
        imageUrls: uploadedUrls,
        ownerId: parseInt(ownerId),
      },
    });

    res.status(201).json({ message: "✅ Phòng đã được thêm!", room });
  } catch (error) {
    console.error("❌ Lỗi khi thêm phòng:", error);
    res.status(500).json({ message: "Lỗi server khi thêm phòng" });
  }
};

/**
 * 📋 Lấy tất cả phòng
 */
export const getAllRooms = async (req, res) => {
  try {
    const { location, type, minPrice, maxPrice } = req.query;

    // Tạo điều kiện lọc động
    const filters = {};

    // Lọc theo địa chỉ
    if (location) {
      filters.address = {
        contains: location,
        mode: "insensitive",
      };
    }

    // Lọc theo loại phòng (title có chứa từ khóa)
    if (type) {
      filters.title = {
        contains: type,
        mode: "insensitive",
      };
    }

    // Lọc theo giá
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.gte = parseFloat(minPrice);
      if (maxPrice) filters.price.lte = parseFloat(maxPrice);
    }

    const rooms = await prisma.room.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(rooms);
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách phòng:", error);
    res.status(500).json({ message: "Lỗi server khi lấy phòng" });
  }
};

/**
 * 🔍 Lấy phòng theo ID
 */
export const getRoomById = async (req, res) => {
  try {
    const roomId = Number(req.params.id);
    const room = await prisma.room.findUnique({ where: { id: roomId } });

    if (!room)
      return res.status(404).json({ message: "Không tìm thấy phòng" });

    res.status(200).json(room);
  } catch (error) {
    console.error("❌ Lỗi khi lấy phòng:", error);
    res.status(500).json({ message: "Lỗi server khi lấy phòng" });
  }
};

/**
 * ✏️ Cập nhật phòng (cho phép upload ảnh mới)
 */
export const updateRoom = async (req, res) => {
  try {
    const roomId = Number(req.params.id);
    const { title, description, price, area, address, status } = req.body;

    const existingRoom = await prisma.room.findUnique({ where: { id: roomId } });
    if (!existingRoom)
      return res.status(404).json({ message: "Không tìm thấy phòng" });

    // Upload ảnh mới (nếu có)
    let uploadedUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "rooms" },
            (err, result) => {
              if (err) reject(err);
              else {
                uploadedUrls.push(result.secure_url);
                resolve(result);
              }
            }
          );
          stream.end(file.buffer);
        });
      }
    }

    const finalImages =
      uploadedUrls.length > 0 ? uploadedUrls : existingRoom.imageUrls;

    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: {
        title: title ?? existingRoom.title,
        description: description ?? existingRoom.description,
        price: price ? parseFloat(price) : existingRoom.price,
        area: area ? parseFloat(area) : existingRoom.area,
        address: address ?? existingRoom.address,
        status: status ?? existingRoom.status,
        imageUrls: finalImages,
      },
    });

    res.status(200).json({
      message:
        uploadedUrls.length > 0
          ? "Cập nhật phòng và ảnh thành công!"
          : "Cập nhật thông tin phòng thành công!",
      room: updatedRoom,
    });
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật phòng:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật phòng" });
  }
};

/**
 * 🗑️ Xóa phòng
 */
export const deleteRoom = async (req, res) => {
  try {
    const roomId = Number(req.params.id);
    const existingRoom = await prisma.room.findUnique({ where: { id: roomId } });
    if (!existingRoom)
      return res.status(404).json({ message: "Không tìm thấy phòng để xóa" });

    await prisma.room.delete({ where: { id: roomId } });
    res.status(200).json({ message: "🗑️ Đã xóa phòng thành công" });
  } catch (error) {
    console.error("❌ Lỗi khi xóa phòng:", error);
    res.status(500).json({ message: "Lỗi server khi xóa phòng" });
  }
};
