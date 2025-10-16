import { PrismaClient } from "../generated/prisma/index.js";

import axios from "axios";
const prisma = new PrismaClient();
export const createPayment = async (req, res) => {
  try {
    const { tenantId, landlordId, amount, description } = req.body;

    // 🔹 Lấy cấu hình ngân hàng của chủ nhà
    const config = await prisma.bankConfig.findUnique({
      where: { landlordId: Number(landlordId) },
    });

    if (!config) {
      return res.status(400).json({ message: "Chủ nhà chưa cấu hình VietQR" });
    }

    // 🔹 Gọi API VietQR.io
    const response = await axios.post("https://api.vietqr.io/v2/generate", {
      accountNo: config.accountNo,
      accountName: config.accountName,
      acqId: mapBankCodeToAcqId(config.bankCode),
      addInfo: description,
      amount,
      template: "compact",
    });

    const qrUrl = response.data.data.qrDataURL;

    // 🔹 Lưu thông tin thanh toán vào DB
    const payment = await prisma.payment.create({
      data: {
        tenantId,
        landlordId,
        amount: parseFloat(amount),
        description,
        qrUrl,
      },
    });

    res.status(201).json({ message: "Tạo QR thanh toán thành công", payment });
  } catch (error) {
    console.error("❌ Lỗi tạo thanh toán:", error);
    res.status(500).json({ message: "Không thể tạo QR VietQR" });
  }
};

// ⚙️ Ánh xạ mã ngân hàng sang ID VietQR
function mapBankCodeToAcqId(code) {
  const bankMap = {
    VCB: 970436, // Vietcombank
    TCB: 970407, // Techcombank
    MBB: 970422, // MBBank
    BIDV: 970418,
    ACB: 970416,
    VPB: 970432,
  };
  return bankMap[code] || 970436;
}
