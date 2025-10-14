import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
export default prisma;
export const upsertBankConfig = async (req, res) => {
  try {
    const { landlord } = req.params;
    const { bankCode, bankName, accountNo, accountName } = req.body;
    if (!bankCode || !bankName || !accountNo || !accountName) {
      return res.status(400).json({ message: "thiếu thông tin ngân hàng" });
    }
    const config = await prisma.bankConfig.upsert({
      where: { landlordId: Number(landlordId) },
      update: { bankCode, bankName, accountNo, accountName },
    });
    res.status(200).json("thành công" + config);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

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
    res.status(200).json(config);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
