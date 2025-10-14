import { PrismaClient } from "../../src/generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const registerLandlord = async (data) => {
  // 1️⃣ Kiểm tra dữ liệu đầu vào
  if (!data.email?.trim() || !data.password?.trim()) {
    throw new Error("Thiếu email hoặc mật khẩu");
  }

  // 2️⃣ Kiểm tra email hợp lệ (regex đơn giản)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error("Định dạng email không hợp lệ");
  }

  // 3️⃣ Kiểm tra email tồn tại trong 3 bảng (chạy song song)
  const [existingUser, existingLandlord, existingAdmin] = await Promise.all([
    prisma.user.findUnique({ where: { email: data.email } }),
    prisma.landlord.findUnique({ where: { email: data.email } }),
    prisma.admin.findUnique({ where: { email: data.email } }),
  ]);

  if (existingUser || existingLandlord || existingAdmin) {
    throw new Error("Email đã tồn tại trong hệ thống");
  }

  // 4️⃣ Kiểm tra độ mạnh mật khẩu
  if (data.password.length < 8) {
    throw new Error("Mật khẩu phải có ít nhất 8 ký tự");
  }

  // 5️⃣ Mã hoá mật khẩu
  const hashed = await bcrypt.hash(data.password, 10);

  // 6️⃣ Tạo landlord mới
  const landlord = await prisma.landlord.create({
    data: {
      email: data.email,
      password: hashed,
      name: data.name?.trim() || null,
      phone: data.phone?.trim() || null,
      address: data.address?.trim() || null,
    },
  });

  // 7️⃣ Phản hồi kết quả
  return {
    message: "Đăng ký landlord thành công",
    landlord: {
      id: landlord.id,
      email: landlord.email,
      name: landlord.name,
      phone: landlord.phone,
      address: landlord.address,
    },
  };
};

export const getLandlordById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID không hợp lệ" });
    }
    const landlord = await prisma.landlord.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        signaturePath: true,
      },
    });
    if (!landlord) {
      return res.status(404).json({ error: "Chủ nhà không tồn tại" });
    }
    res.status(200).json(landlord);
  } catch (error) {
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
