import { PrismaClient } from "../../src/generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const registerUser = async (data) => {
  if (!data.email || !data.password) throw new Error("Thiếu email hoặc mật khẩu");

  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error("Email đã tồn tại");

  const hashed = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashed,
      name: data.name || null,
      phone: data.phone || null,
    },
  });

  return { message: "Đăng ký người dùng thành công", user };
};
