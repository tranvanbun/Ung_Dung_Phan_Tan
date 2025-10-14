import React from "react";
import {
  X,
  MapPin,
  Home,
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail,
  Check,
  XCircle,
} from "lucide-react";

export default function ModalRoomDetail({ room, isOpen, onClose }) {
  if (!isOpen || !room) return null;

  // Mock data - Thay thế bằng data thực từ API
  const roomData = {
    id: room.id || "1",
    title: room.title || "Phòng trọ cao cấp gần Đại học Bách Khoa",
    type: room.type || "Studio",
    area: room.area || 25,
    price: room.price || 3000000,
    deposit: room.deposit || 6000000,
    status: room.status || "available",
    description:
      room.description ||
      "Phòng mới xây, đầy đủ tiện nghi, an ninh 24/7. Gần trường học, siêu thị, công viên.",

    // Địa chỉ
    address: {
      province: "Hà Nội",
      district: "Cầu Giấy",
      ward: "Dịch Vọng",
      street: "123 Đường Láng",
      buildingName: "Tòa A",
      floor: 3,
      roomNumber: "301",
    },

    // Chi tiết phòng
    bedrooms: room.bedrooms || 1,
    bathrooms: room.bathrooms || 1,

    // Tiện nghi
    furniture: room.furniture || ["bed", "wardrobe", "desk", "ac", "fridge"],
    utilities: room.utilities || ["wifi", "parking", "elevator", "security"],
    rules: room.rules || ["no_smoking", "no_pets"],

    // Hình ảnh
    images: room.images || [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800",
    ],

    // Chủ trọ
    landlord: {
      id: "landlord-1",
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "landlord@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
    },

    // Ngày đăng
    createdAt: "2024-10-01T08:00:00",
    updatedAt: "2024-10-10T10:30:00",
  };

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Icons mapping
  const furnitureIcons = {
    bed: "🛏️ Giường",
    wardrobe: "🚪 Tủ quần áo",
    desk: "🪑 Bàn làm việc",
    ac: "❄️ Điều hòa",
    fridge: "🧊 Tủ lạnh",
    washing_machine: "🧺 Máy giặt",
    kitchen: "🍳 Bếp",
    tv: "📺 TV",
  };

  const utilityIcons = {
    wifi: "📶 WiFi",
    parking: "🅿️ Chỗ đậu xe",
    elevator: "🛗 Thang máy",
    security: "🔒 Bảo vệ 24/7",
    water_heater: "🚿 Nóng lạnh",
    balcony: "🪟 Ban công",
  };

  const ruleIcons = {
    no_smoking: "🚭 Không hút thuốc",
    no_pets: "🐕 Không nuôi thú",
    quiet_hours: "🔇 Giờ giấc nghiêm ngặt",
    guests_allowed: "👥 Cho phép khách",
  };

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

  const fullAddress = `${roomData.address.street}, ${roomData.address.ward}, ${roomData.address.district}, ${roomData.address.province}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header với Close Button */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-800">Chi tiết phòng</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN - Images & Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="relative">
                <img
                  src={roomData.images[currentImageIndex]}
                  alt={`Room ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover rounded-xl"
                />

                {/* Image Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 px-3 py-2 rounded-full">
                  {roomData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition ${
                        currentImageIndex === index
                          ? "bg-white w-6"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>

                {/* Thumbnail Grid */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {roomData.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                        currentImageIndex === index
                          ? "border-indigo-600"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Title & Status */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {roomData.title}
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusConfig[roomData.status].color
                    }`}
                  >
                    {statusConfig[roomData.status].icon}{" "}
                    {statusConfig[roomData.status].label}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    {roomData.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {roomData.area}m²
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(roomData.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-indigo-100 text-sm mb-1">
                      Giá thuê/tháng
                    </p>
                    <p className="text-3xl font-bold">
                      {roomData.price.toLocaleString()}đ
                    </p>
                  </div>
                  <div>
                    <p className="text-indigo-100 text-sm mb-1">Tiền cọc</p>
                    <p className="text-2xl font-bold">
                      {roomData.deposit.toLocaleString()}đ
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  Địa chỉ
                </h3>
                <p className="text-gray-700 mb-2">📍 {fullAddress}</p>
                {roomData.address.buildingName && (
                  <p className="text-gray-600 text-sm">
                    🏢 {roomData.address.buildingName} - Tầng{" "}
                    {roomData.address.floor} - Phòng{" "}
                    {roomData.address.roomNumber}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  📝 Mô tả
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {roomData.description}
                </p>
              </div>

              {/* Room Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    {roomData.bedrooms}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">Phòng ngủ</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-purple-600">
                    {roomData.bathrooms}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">Phòng tắm</p>
                </div>
              </div>

              {/* Furniture */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  🛋️ Nội thất
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {roomData.furniture.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm"
                    >
                      <Check className="w-4 h-4 text-green-600" />
                      <span>{furnitureIcons[item]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Utilities */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  ✨ Tiện ích
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {roomData.utilities.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg text-sm text-green-700"
                    >
                      <Check className="w-4 h-4" />
                      <span>{utilityIcons[item]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  📜 Nội quy
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {roomData.rules.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg text-sm text-yellow-700"
                    >
                      <span>{ruleIcons[item]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Landlord & Actions */}
            <div className="space-y-6">
              {/* Landlord Card */}
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

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Liên hệ ngay
                  </button>
                  <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    Đặt xem phòng
                  </button>
                  <button className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium">
                    💾 Lưu tin
                  </button>
                </div>

                {/* Warning */}
                {roomData.status !== "available" && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Phòng hiện{" "}
                      {statusConfig[roomData.status].label.toLowerCase()}
                    </p>
                  </div>
                )}
              </div>

              {/* Report */}
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
