  import React, { useState } from "react";
  import RoomCard from "../Component/RoomCard";

  const roomsData = [
    {
      id: 1,
      title: "Phòng trọ tiện nghi Hà Nội",
      price: 3000000,
      location: "Hà Nội",
      type: "Phòng trọ",
      area: 20,
      beds: 1,
      baths: 1,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      id: 2,
      title: "Nhà nguyên căn TP.HCM",
      price: 7500000,
      location: "TP.HCM",
      type: "Nhà nguyên căn",
      area: 60,
      beds: 3,
      baths: 2,
      imageUrl: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
    },
    {
      id: 3,
      title: "Chung cư mini Đà Nẵng",
      price: 4200000,
      location: "Đà Nẵng",
      type: "Chung cư",
      area: 30,
      beds: 2,
      baths: 1,
      imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    },
    {
      id: 4,
      title: "Phòng giá rẻ Hà Nội",
      price: 2000000,
      location: "Hà Nội",
      type: "Phòng trọ",
      area: 15,
      beds: 1,
      baths: 1,
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    },
  ];

  export default function SearchPage() {
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const filteredRooms = roomsData.filter((room) => {
      const matchLocation = location ? room.location === location : true;
      const matchType = type ? room.type === type : true;
      const matchPrice =
        (minPrice ? room.price >= parseInt(minPrice) : true) &&
        (maxPrice ? room.price <= parseInt(maxPrice) : true);

      return matchLocation && matchType && matchPrice;
    });

    return (
      <div className="min-h-screen bg-gray-200 px-6 py-10 mt-10">
        <div className="container mx-auto">
          {/* Bộ lọc */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-lg border px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Chọn địa điểm</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP.HCM">TP.HCM</option>
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg border px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Chọn loại phòng</option>
              <option value="Phòng trọ">Phòng trọ</option>
              <option value="Nhà nguyên căn">Nhà nguyên căn</option>
              <option value="Chung cư">Chung cư mini</option>
            </select>

            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Giá tối thiểu"
              className="rounded-lg border px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
            />

            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Giá tối đa"
              className="rounded-lg border px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Danh sách kết quả */}
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} {...room} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Không tìm thấy phòng nào phù hợp.</p>
          )}
        </div>
      </div>
    );
  }
