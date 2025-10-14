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
export const getUserById = async (req,res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID không hợp lệ" });
    }
    const user = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true, phone: true, signaturePath:true, } });
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
};