import React, { useState } from "react";

export default function AddRoom() {
  const [currentStep, setCurrentStep] = useState(1); // 1, 2, 3
  const [formData, setFormData] = useState({
    // Step 1: Thông tin cơ bản
    title: "",
    type: "studio",
    area: "",
    price: "",
    deposit: "",
    status: "available",

    // Step 2: Địa chỉ
    province: "",
    district: "",
    ward: "",
    street: "",
    buildingName: "",
    floor: "",
    roomNumber: "",

    // Step 3: Chi tiết & Tiện ích
    description: "",
    bedrooms: 1,
    bathrooms: 1,
    furniture: [],
    utilities: [],
    rules: [],

    // Hình ảnh
    images: [],
  });

  const furnitureOptions = [
    { id: "bed", label: "🛏️ Giường" },
    { id: "wardrobe", label: "🚪 Tủ quần áo" },
    { id: "desk", label: "🪑 Bàn làm việc" },
    { id: "ac", label: "❄️ Điều hòa" },
    { id: "fridge", label: "🧊 Tủ lạnh" },
    { id: "washing_machine", label: "🧺 Máy giặt" },
    { id: "kitchen", label: "🍳 Bếp" },
    { id: "tv", label: "📺 TV" },
  ];

  const utilityOptions = [
    { id: "wifi", label: "📶 WiFi" },
    { id: "parking", label: "🅿️ Chỗ đậu xe" },
    { id: "elevator", label: "🛗 Thang máy" },
    { id: "security", label: "🔒 Bảo vệ 24/7" },
    { id: "water_heater", label: "🚿 Nóng lạnh" },
    { id: "balcony", label: "🪟 Ban công" },
  ];

  const ruleOptions = [
    { id: "no_smoking", label: "🚭 Không hút thuốc" },
    { id: "no_pets", label: "🐕 Không nuôi thú" },
    { id: "quiet_hours", label: "🔇 Giờ giấc" },
    { id: "guests_allowed", label: "👥 Cho phép khách" },
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleArrayItem = (field, item) => {
    const current = formData[field];
    if (current.includes(item)) {
      handleChange(
        field,
        current.filter((i) => i !== item)
      );
    } else {
      handleChange(field, [...current, item]);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // TODO: Upload images to server
    const urls = files.map((file) => URL.createObjectURL(file));
    handleChange("images", [...formData.images, ...urls]);
  };

  const removeImage = (index) => {
    handleChange(
      "images",
      formData.images.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = () => {
    console.log("Submit room data:", formData);
    alert("Phòng đã được đăng thành công!");
    // TODO: Call API
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return (
        formData.title &&
        formData.type &&
        formData.area &&
        formData.price &&
        formData.deposit
      );
    }
    if (currentStep === 2) {
      return formData.province && formData.district && formData.street;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 mt-20">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ➕ Đăng phòng mới
          </h1>
          <p className="text-gray-600">
            Điền thông tin phòng để bắt đầu cho thuê
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: "Thông tin cơ bản" },
              { step: 2, label: "Địa chỉ" },
              { step: 3, label: "Chi tiết & Hoàn tất" },
            ].map((item, index) => (
              <React.Fragment key={item.step}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                      currentStep >= item.step
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {currentStep > item.step ? "✓" : item.step}
                  </div>
                  <p
                    className={`mt-2 text-sm font-medium ${
                      currentStep >= item.step
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
                {index < 2 && (
                  <div
                    className={`flex-1 h-1 mx-4 transition ${
                      currentStep > item.step ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* STEP 1: Thông tin cơ bản */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                📋 Thông tin cơ bản
              </h2>

              {/* Tiêu đề */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="VD: Phòng trọ cao cấp gần ĐH Bách Khoa"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              {/* Loại phòng & Trạng thái */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại phòng
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="studio">Studio</option>
                    <option value="apartment">Chung cư</option>
                    <option value="house">Nhà nguyên căn</option>
                    <option value="room">Phòng trọ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="available">Còn trống</option>
                    <option value="occupied">Đã cho thuê</option>
                    <option value="maintenance">Đang bảo trì</option>
                  </select>
                </div>
              </div>

              {/* Diện tích, Giá, Cọc */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diện tích (m²) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => handleChange("area", e.target.value)}
                    placeholder="25"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá thuê/tháng (đ) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    placeholder="3000000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tiền cọc (đ) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.deposit}
                    onChange={(e) => handleChange("deposit", e.target.value)}
                    placeholder="6000000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Địa chỉ */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                📍 Địa chỉ
              </h2>

              {/* Tỉnh/Thành, Quận/Huyện, Phường/Xã */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tỉnh/Thành phố <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => handleChange("province", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Chọn tỉnh/thành</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quận/Huyện <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => handleChange("district", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Chọn quận/huyện</option>
                    <option value="caugiay">Cầu Giấy</option>
                    <option value="dongda">Đống Đa</option>
                    <option value="hoankiem">Hoàn Kiếm</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phường/Xã
                  </label>
                  <select
                    value={formData.ward}
                    onChange={(e) => handleChange("ward", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Chọn phường/xã</option>
                    <option value="dichvong">Dịch Vọng</option>
                    <option value="maidinh">Mai Dịch</option>
                  </select>
                </div>
              </div>

              {/* Đường, Tòa nhà */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đường/Phố <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => handleChange("street", e.target.value)}
                    placeholder="123 Đường Láng"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên tòa nhà/Chung cư
                  </label>
                  <input
                    type="text"
                    value={formData.buildingName}
                    onChange={(e) =>
                      handleChange("buildingName", e.target.value)
                    }
                    placeholder="Tòa A"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Tầng, Số phòng */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tầng
                  </label>
                  <input
                    type="number"
                    value={formData.floor}
                    onChange={(e) => handleChange("floor", e.target.value)}
                    placeholder="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số phòng
                  </label>
                  <input
                    type="text"
                    value={formData.roomNumber}
                    onChange={(e) => handleChange("roomNumber", e.target.value)}
                    placeholder="301"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Chi tiết & Tiện ích */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                ✨ Chi tiết & Tiện ích
              </h2>

              {/* Mô tả */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả chi tiết
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={5}
                  placeholder="Mô tả phòng, vị trí, tiện ích xung quanh..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Phòng ngủ, Phòng tắm */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số phòng ngủ
                  </label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => handleChange("bedrooms", e.target.value)}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số phòng tắm
                  </label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => handleChange("bathrooms", e.target.value)}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Nội thất */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Nội thất
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {furnitureOptions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleArrayItem("furniture", item.id)}
                      className={`px-4 py-3 border-2 rounded-lg font-medium transition ${
                        formData.furniture.includes(item.id)
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tiện ích */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tiện ích
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {utilityOptions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleArrayItem("utilities", item.id)}
                      className={`px-4 py-3 border-2 rounded-lg font-medium transition ${
                        formData.utilities.includes(item.id)
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nội quy */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Nội quy
                </label>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                  {ruleOptions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleArrayItem("rules", item.id)}
                      className={`px-4 py-3 border-2 rounded-lg font-medium transition ${
                        formData.rules.includes(item.id)
                          ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Hình ảnh phòng
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer inline-flex flex-col items-center"
                  >
                    <span className="text-4xl mb-2">📷</span>
                    <span className="text-gray-600 font-medium">
                      Nhấp để tải ảnh lên
                    </span>
                    <span className="text-gray-400 text-sm mt-1">
                      PNG, JPG (tối đa 5MB)
                    </span>
                  </label>
                </div>

                {/* Preview Images */}
                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Preview ${index}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                currentStep === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              ← Quay lại
            </button>

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!isStepValid()}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  isStepValid()
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Tiếp theo →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                ✓ Đăng phòng
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
