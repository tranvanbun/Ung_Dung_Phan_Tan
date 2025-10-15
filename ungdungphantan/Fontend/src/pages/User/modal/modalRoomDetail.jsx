import React, { useState } from "react";
import { X, MapPin, Home, Calendar, Phone, Mail, XCircle } from "lucide-react";

export default function ModalRoomDetail({ room, isOpen, onClose }) {
  if (!isOpen || !room) return null;

  // 🧩 Nếu backend chưa có đủ dữ liệu, dùng fallback mock
  const roomData = {
    id: room.id || 1,
    title: room.title || "Phòng trọ cao cấp gần Đại học Bách Khoa",
    area: room.area || 25,
    price: room.price || 3000000,
    status: room.status || "available",
    description:
      room.description ||
      "Phòng mới xây, có ban công, đầy đủ nội thất cơ bản. Gần trường học, siêu thị, giao thông thuận tiện.",
    address: room.address || "123 Đường Láng, Quận Đống Đa, Hà Nội",
    imageUrls:
      room.imageUrls?.length > 0
        ? room.imageUrls
        : [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
            "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          ],
    landlord: room.landlord || {
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "landlord@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    createdAt: room.createdAt || "2024-10-10T10:00:00",
  };

  const [currentImage, setCurrentImage] = useState(0);

  const statusConfig = {
    available: {
      color: "bg-green-100 text-green-700",
      label: "Còn trống",
      icon: "✅",
    },
    occupied: {
      color: "bg-red-100 text-red-700",
      label: "Đã cho thuê",
      icon: "🔒",
    },
    maintenance: {
      color: "bg-yellow-100 text-yellow-700",
      label: "Đang bảo trì",
      icon: "🔧",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-800">Chi tiết phòng</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Nội dung */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cột trái */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ảnh */}
              <div className="relative">
                <img
                  src={roomData.imageUrls[currentImage]}
                  alt={`Room ${currentImage + 1}`}
                  className="w-full h-96 object-cover rounded-xl"
                />

                {/* Chuyển ảnh */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 px-3 py-2 rounded-full">
                  {roomData.imageUrls.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-2 h-2 rounded-full transition ${
                        currentImage === i
                          ? "bg-white w-6"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>

                {/* Thumbnail */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {roomData.imageUrls.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      onClick={() => setCurrentImage(i)}
                      className={`h-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                        currentImage === i
                          ? "border-indigo-600"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thông tin chính */}
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {roomData.title}
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusConfig[roomData.status]?.color
                    }`}
                  >
                    {statusConfig[roomData.status]?.icon}{" "}
                    {statusConfig[roomData.status]?.label}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    {roomData.area}m²
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {roomData.address}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(roomData.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>

              {/* Giá */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-indigo-100 text-sm mb-1">
                  Giá thuê / tháng
                </h3>
                <p className="text-3xl font-bold">
                  {roomData.price.toLocaleString()} đ
                </p>
              </div>

              {/* Mô tả */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  📝 Mô tả
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {roomData.description}
                </p>
              </div>

              {/* Thông báo tình trạng */}
              {roomData.status !== "available" && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2 text-yellow-800">
                  <XCircle className="w-5 h-5" />
                  Phòng hiện{" "}
                  {statusConfig[roomData.status]?.label.toLowerCase()}
                </div>
              )}
            </div>

            {/* Cột phải */}
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sticky top-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  👤 Chủ trọ
                </h3>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={roomData.landlord.avatar}
                    alt={roomData.landlord.name}
                    className="w-16 h-16 rounded-full border-2 border-indigo-200"
                  />
                  <div>
                    <p className="font-bold text-gray-800">
                      {roomData.landlord.name}
                    </p>
                    <p className="text-sm text-gray-500">Chủ nhà</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <a
                    href={`tel:${roomData.landlord.phone}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{roomData.landlord.phone}</span>
                  </a>
                  <a
                    href={`mailto:${roomData.landlord.email}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{roomData.landlord.email}</span>
                  </a>
                </div>

                {/* Nút hành động */}
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                    📞 Liên hệ ngay
                  </button>
                  <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                    💳 Đặt thuê / Thanh toán
                  </button>
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium">
                🚩 Báo cáo tin không phù hợp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
