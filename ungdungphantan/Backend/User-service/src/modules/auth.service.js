import { PrismaClient } from "../../src/generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Đăng nhập (check trong 3 bảng: user, landlord, admin)
 * ❌ Không sử dụng JWT
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Kiểm tra dữ liệu nhập vào
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập email và mật khẩu" });
    }

    // 2️⃣ Tìm người dùng trong 3 bảng
    let user =
      (await prisma.user.findUnique({ where: { email } })) ||
      (await prisma.landlord.findUnique({ where: { email } })) ||
      (await prisma.admin.findUnique({ where: { email } }));

    if (!user) {
      return res
        .status(404)
        .json({ message: "Email không tồn tại trong hệ thống" });
    }

    // 3️⃣ Kiểm tra mật khẩu
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    // 4️⃣ Xác định role theo bảng
    let role = "USER";
    if (await prisma.landlord.findUnique({ where: { email } }))
      role = "LANDLORD";
    if (await prisma.admin.findUnique({ where: { email } })) role = "ADMIN";

    // 5️⃣ Trả về thông tin người dùng (không tạo token)
    return res.status(200).json({
      message: "Đăng nhập thành công ✅",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (error) {
    console.error("🔥 Lỗi khi đăng nhập:", error);
    return res.status(500).json({ message: "Lỗi server khi đăng nhập" });
  }
};
