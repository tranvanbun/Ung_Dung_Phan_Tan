import React, { useState, useEffect } from "react";
import RoomCard from "../../Component/RoomCard";
import ModalRoomDetail from "./modal/modalRoomDetail";
import { getAllRooms } from "../../api/roomApi"; // ✅ Import API

export default function SearchPage() {
  const [searchName, setSearchName] = useState(""); // ✅ Thêm state tìm kiếm theo tên
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ State để lưu danh sách phòng từ API
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Gọi API khi component mount
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllRooms();
      setRooms(data.rooms || data); // Tùy response từ backend
    } catch (err) {
      setError("Không thể tải danh sách phòng");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Lọc phòng dựa trên filter (bao gồm tìm kiếm theo tên)
  const filteredRooms = rooms.filter((room) => {
    const matchName = searchName
      ? room.title.toLowerCase().includes(searchName.toLowerCase())
      : true;
    const matchLocation = location
      ? room.address.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchType = type
      ? room.title.toLowerCase().includes(type.toLowerCase())
      : true;
    const matchPrice =
      (minPrice ? room.price >= parseInt(minPrice) : true) &&
      (maxPrice ? room.price <= parseInt(maxPrice) : true);

    return matchName && matchLocation && matchType && matchPrice;
  });

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  // ✅ Reset tất cả bộ lọc
  const handleResetFilters = () => {
    setSearchName("");
    setLocation("");
    setType("");
    setMinPrice("");
    setMaxPrice("");
  };

  // ✅ Hiển thị loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Đang tải danh sách phòng...</p>
      </div>
    );
  }

  // ✅ Hiển thị lỗi
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 px-6 py-10 mt-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6"></h1>

        {/* ✅ Thanh tìm kiếm theo tên */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="🔎 Tìm kiếm theo tên phòng..."
              className="w-full rounded-lg border-2 border-gray-300 px-5 py-3 text-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
            />
            {searchName && (
              <button
                onClick={() => setSearchName("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Bộ lọc nâng cao */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-5">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="📍 Địa điểm"
            className="rounded-lg border px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="🏠 Loại phòng"
            className="rounded-lg border px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="💰 Giá tối thiểu"
            className="rounded-lg border px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="💰 Giá tối đa"
            className="rounded-lg border px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          />

          {/* ✅ Nút reset bộ lọc */}
          <button
            onClick={handleResetFilters}
            className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 transition"
          >
            🔄 Xóa lọc
          </button>
        </div>

        {/* Hiển thị số kết quả */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Tìm thấy{" "}
            <span className="font-bold text-indigo-600">
              {filteredRooms.length}
            </span>{" "}
            phòng
          </p>
        </div>

        {/* Danh sách kết quả */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                title={room.title}
                price={room.price}
                address={room.address}
                imageUrl={
                  room.imageUrls?.[0] || "https://via.placeholder.com/400"
                }
                area={room.area}
                onClick={() => handleRoomClick(room)}
                onToggleFavorite={(fav) =>
                  console.log("Yêu thích phòng", room.id, fav)
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              ❌ Không tìm thấy phòng nào phù hợp
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Xem tất cả phòng
            </button>
          </div>
        )}
      </div>

      <ModalRoomDetail
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
