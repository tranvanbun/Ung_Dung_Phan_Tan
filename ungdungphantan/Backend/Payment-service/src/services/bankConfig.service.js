import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

// 🧩 Tạo hoặc cập nhật cấu hình ngân hàng
export const upsertBankConfig = async (req, res) => {
  try {
    // 🟩 Lấy dữ liệu từ body (không dùng params nữa)
    const { landlordId, bankCode, bankName, accountNo, accountName } = req.body;

    if (!landlordId)
      return res.status(400).json({ message: "Thiếu landlordId" });
    if (!bankCode || !bankName || !accountNo || !accountName)
      return res.status(400).json({ message: "Thiếu thông tin ngân hàng" });

    // 🟩 Kiểm tra xem landlord đã có cấu hình chưa
    const existing = await prisma.bankConfig.findUnique({
      where: { landlordId: Number(landlordId) },
    });

    let config;
    if (existing) {
      // Nếu có → cập nhật
      config = await prisma.bankConfig.update({
        where: { landlordId: Number(landlordId) },
        data: { bankCode, bankName, accountNo, accountName },
      });
    } else {
      // Nếu chưa có → tạo mới
      config = await prisma.bankConfig.create({
        data: {
          landlordId: Number(landlordId),
          bankCode,
          bankName,
          accountNo,
          accountName,
        },
      });
    }

    return res.status(200).json({
      message: "Cấu hình ngân hàng đã được lưu thành công",
      config,
    });
  } catch (error) {
    console.error("❌ Lỗi khi lưu cấu hình ngân hàng:", error);
    return res.status(500).json({ message: error.message });
  }
};

// 🧭 Lấy thông tin cấu hình ngân hàng theo landlordId
export const getBankConfig = async (req, res) => {
  try {
    const { landlordId } = req.params;

    const config = await prisma.bankConfig.findUnique({
      where: { landlordId: Number(landlordId) },
    });

    if (!config) {
      return res
        .status(404)
        .json({ message: "Cấu hình ngân hàng không tồn tại" });
    }

    return res.status(200).json(config);
  } catch (error) {
    console.error("❌ Lỗi khi lấy thông tin ngân hàng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
