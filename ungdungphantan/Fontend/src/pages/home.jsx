import React from "react";
import anhquangcao from "../assets/imgs/logo1.jpg";
import anhtro from "../assets/imgs/anhtro.png";
import RoomCard from "../Component/RoomCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Home = () => {
  // Mock data: danh sách phòng mới đăng
  const newRooms = [
    {
      id: 1,
      title: "Phòng trọ tiện nghi Hà Nội",
      price: 3000000,
      location: "Quận Cầu Giấy, Hà Nội",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      area: 20,
      beds: 1,
      baths: 1,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Nhà nguyên căn TP.HCM",
      price: 7500000,
      location: "Quận 1, TP.HCM",
      img: anhtro,
      area: 45,
      beds: 2,
      baths: 2,
      rating: 4.8,
    },
    {
      id: 4,
      title: "Phòng giá rẻ Hà Nội",
      price: 2500000,
      location: "Quận Hoàng Mai, Hà Nội",
      img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
      area: 18,
      beds: 1,
      baths: 1,
      rating: 4.0,
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen px-6">
      {/* Hero Section */}
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center py-16">
        {/* Left: Text + Form */}
        <div className="text-white space-y-6">
          <h1 className="text-4xl text-gray-200 md:text-5xl font-bold leading-tight">
            Tìm phòng trọ đơn giản <br /> và thuận tiện
          </h1>
          <p className="text-gray-200">
            Hỗ trợ cho quảng cáo và tìm kiếm phòng trọ nhanh chóng, dễ dàng
          </p>

          {/* Search form */}
          <div className="bg-white rounded-md shadow-md flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x overflow-hidden">
            <select className="p-4 outline-none text-gray-700 flex-1">
              <option>Vị trí</option>
              <option>Hà Nội</option>
              <option>TP.HCM</option>
              <option>Đà Nẵng</option>
            </select>
            <select className="p-4 outline-none text-gray-700 flex-1">
              <option>Kiểu</option>
              <option>Chung cư</option>
              <option>Nhà nguyên căn</option>
              <option>Phòng trọ</option>
            </select>
            <button className="bg-teal-500 text-white px-6 py-4 font-medium hover:bg-teal-600 transition cursor-pointer">
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div>
          <img src={anhquangcao} alt="House" className="rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Danh sách phòng mới đăng */}
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold text-gray-200 mb-6">
          Phòng mới được đăng
        </h2>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {newRooms.map((room) => (
            <SwiperSlide key={room.id}>
              <RoomCard
                title={room.title}
                price={room.price}
                address={room.location}
                imageUrl={room.img}
                area={room.area}
                beds={room.beds}
                baths={room.baths}
                onClick={() => console.log("Chi tiết phòng:", room.id)}
                onToggleFavorite={(fav) =>
                  console.log("Yêu thích phòng", room.id, fav)
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
