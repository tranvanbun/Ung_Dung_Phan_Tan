import fs from "fs";
import path from "path";
import axios from "axios";
import PDFDocument from "pdfkit";
import { PrismaClient } from "../generated/prisma/index.js";
import cloudinary from "../utils/cloudinary.js";

const prisma = new PrismaClient();

// ===========================
// ⚙️ Helper tải ảnh chữ ký từ Cloudinary (Async + Timeout)
// ===========================
const downloadImage = async (url, filepath) => {
  try {
    const response = await axios({
      url,
      responseType: "arraybuffer",
      timeout: 5000, // ⏱ timeout ngắn để tránh treo
    });
    await fs.promises.writeFile(filepath, Buffer.from(response.data, "binary"));
  } catch (error) {
    console.warn("⚠️ Lỗi tải ảnh chữ ký:", error.message);
  }
};

// Helper upload có timeout
const uploadWithTimeout = (filePath, options, ms = 10000) =>
  Promise.race([
    cloudinary.uploader.upload(filePath, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Upload PDF timeout")), ms)
    ),
  ]);

// Helper lấy dữ liệu người dùng an toàn
const fetchUserData = async (url) => {
  try {
    const res = await axios.get(url, { timeout: 3000 });
    return res.data;
  } catch (error) {
    console.warn("⚠️ Không thể lấy dữ liệu từ:", url, error.message);
    return {};
  }
};

// ===========================
// 🧾 TẠO HỢP ĐỒNG THUÊ PHÒNG (phiên bản tối ưu)
// ===========================
export const generateContract = async (req, res) => {
  try {
    const { tenantId, roomId, ownerId, startDate, endDate } = req.body;
    console.log("📦 Dữ liệu nhận từ body:", req.body);

    // 1️⃣ Kiểm tra đầu vào
    if (!tenantId || !roomId || !ownerId || !startDate || !endDate) {
      return res.status(400).json({ message: "Thiếu thông tin hợp đồng" });
    }

    // 2️⃣ Lấy thông tin phòng
    const room = await prisma.room.findUnique({
      where: { id: Number(roomId) },
    });
    if (!room) return res.status(404).json({ message: "Phòng không tồn tại" });

    // 3️⃣ Lấy thông tin người thuê & chủ trọ song song
    const [tenant, owner] = await Promise.all([
      fetchUserData(`http://localhost:3000/users/${tenantId}`),
      fetchUserData(`http://localhost:3000/landlords/${ownerId}`),
    ]);

    // 4️⃣ Tính tổng tiền thuê
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    const totalPrice = room.price * (months || 1);

    // 5️⃣ Tạo thư mục tạm lưu PDF
    const tempDir = path.join(process.cwd(), "src", "temp");
    await fs.promises.mkdir(tempDir, { recursive: true });

    const pdfName = `contract_${Date.now()}.pdf`;
    const pdfPath = path.join(tempDir, pdfName);

    // 6️⃣ Tạo PDF hợp đồng
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const pdfStream = fs.createWriteStream(pdfPath);
    doc.pipe(pdfStream);

    doc.fontSize(20).text("HỢP ĐỒNG THUÊ PHÒNG", { align: "center" });
    doc.moveDown(1.5);

    doc
      .fontSize(12)
      .text(
        `Hôm nay, ngày ${new Date().getDate()} tháng ${
          new Date().getMonth() + 1
        } năm ${new Date().getFullYear()}, chúng tôi gồm:`
      );

    doc.moveDown(1);
    doc.text(`BÊN CHO THUÊ (BÊN A):`);
    doc.text(`Họ và tên: ${owner.name || "Chủ trọ"}`);
    doc.text(`Địa chỉ: ${owner.address || "N/A"}`);
    doc.text(`Số điện thoại: ${owner.phone || "N/A"}`);
    doc.moveDown(1);

    doc.text(`BÊN THUÊ (BÊN B):`);
    doc.text(`Họ và tên: ${tenant.name || "Người thuê"}`);
    doc.text(`Địa chỉ: ${tenant.address || "N/A"}`);
    doc.text(`Số điện thoại: ${tenant.phone || "N/A"}`);

    doc.moveDown(1);
    doc.text("Hai bên thỏa thuận ký kết hợp đồng thuê phòng như sau:");
    doc.text(`1. Phòng: ${room.title}, địa chỉ: ${room.address}`);
    doc.text(`2. Thời gian thuê: ${startDate} đến ${endDate}`);
    doc.text(`3. Giá thuê: ${room.price.toLocaleString()} VND/tháng`);
    doc.text(`4. Tổng tiền thuê: ${totalPrice.toLocaleString()} VND`);
    doc.text(`5. Trách nhiệm các bên:`);
    doc.text("   - Bên A bàn giao phòng đúng hạn.");
    doc.text("   - Bên B thanh toán đúng hạn và giữ gìn tài sản.");
    doc.moveDown(2);

    doc.text("Chủ trọ ký:", 100, 600);
    doc.text("Người thuê ký:", 350, 600);

    // 7️⃣ Tải chữ ký song song (nếu có)
    const ownerSigPath = path.join(tempDir, "owner_sig.png");
    const tenantSigPath = path.join(tempDir, "tenant_sig.png");

    await Promise.all([
      owner.signaturePath
        ? downloadImage(owner.signaturePath, ownerSigPath)
        : null,
      tenant.signaturePath
        ? downloadImage(tenant.signaturePath, tenantSigPath)
        : null,
    ]);

    if (fs.existsSync(ownerSigPath))
      doc.image(ownerSigPath, 100, 620, { width: 120 });
    if (fs.existsSync(tenantSigPath))
      doc.image(tenantSigPath, 350, 620, { width: 120 });

    doc.end(); 

    // 8️⃣ Đảm bảo PDF tạo xong
    await new Promise((resolve, reject) => {
      pdfStream.on("finish", resolve);
      pdfStream.on("error", reject); // tránh treo nếu lỗi ghi file
    });

    // 9️⃣ Upload PDF lên Cloudinary có timeout
    const uploadResult = await uploadWithTimeout(pdfPath, {
      folder: "contracts",
      resource_type: "raw",
    });

    // 🔟 Lưu hợp đồng vào database
    const contract = await prisma.contract.create({
      data: {
        tenantId: Number(tenantId),
        roomId: Number(roomId),
        ownerId: Number(ownerId),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice,
        pdfPath: uploadResult.secure_url,
      },
    });

    // 🔹 Dọn file tạm
    await Promise.all([
      fs.promises.unlink(pdfPath).catch(() => {}),
      fs.promises.unlink(ownerSigPath).catch(() => {}),
      fs.promises.unlink(tenantSigPath).catch(() => {}),
    ]);

    // ✅ Thành công
    return res.status(201).json({
      message: "✅ Tạo hợp đồng thành công!",
      contract,
    });
  } catch (error) {
    console.error("❌ Lỗi khi tạo hợp đồng:", error);
    return res.status(500).json({
      message: "Lỗi server khi tạo hợp đồng",
      error: error.message,
    });
  }
};
