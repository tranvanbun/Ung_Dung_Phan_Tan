// src/modules/auth.service.js
import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Hàm kiểm tra định dạng email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// =========================
// 🧩 ĐĂNG KÝ NGƯỜI DÙNG MỚI
// =========================
export const register = async (data) => {
  console.log("📩 Dữ liệu đăng ký:", data);

  // 1️⃣ Kiểm tra dữ liệu hợp lệ
  if (!data.email || !data.password) {
    throw new Error("Thiếu email hoặc mật khẩu");
  }
  if (!isValidEmail(data.email)) {
    throw new Error("Email không hợp lệ");
  }
  if (data.password.length < 8) {
    throw new Error("Mật khẩu phải có ít nhất 8 ký tự");
  }

  // 2️⃣ Kiểm tra email đã tồn tại
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    throw new Error("Email đã được sử dụng");
  }

  // 3️⃣ Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // 4️⃣ Lưu user mới vào database
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name || null,
      role: data.role || "USER",
    },
  });

  // 5️⃣ Trả về kết quả (ẩn mật khẩu)
  return {
    message: "Đăng ký thành công",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};
