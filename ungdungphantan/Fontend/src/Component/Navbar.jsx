import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🧠 Khi Navbar load, đọc thông tin người dùng từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser)); // { id, name, role }
  }, []);

  // 🧹 Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-[#0B121B] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* 🧩 Logo + Brand */}
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold text-gray-200">
            <span className="text-2xl text-teal-400">N</span>hóm 9
          </span>
        </NavLink>

        {/* 🧭 Menu */}
        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-200 transition duration-300 pr-5 pl-5 ${
                isActive
                  ? "border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600"
              }`
            }
          >
            Trang chủ
          </NavLink>

          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              `text-gray-200 transition duration-300 pr-5 pl-5 ${
                isActive
                  ? "border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600"
              }`
            }
          >
            Tìm kiếm
          </NavLink>

          <NavLink
            to="/contracts"
            className={({ isActive }) =>
              `text-gray-200 transition duration-300 pr-5 pl-5 ${
                isActive
                  ? "border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600"
              }`
            }
          >
            Hợp đồng
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) =>
              `text-gray-200 transition duration-300 pr-5 pl-5 ${
                isActive
                  ? "border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600"
              }`
            }
          >
            Liên hệ
          </NavLink>
          <NavLink
            to="/payments"
            className={({ isActive }) =>
              `text-gray-200 transition duration-300 pr-5 pl-5 ${
                isActive
                  ? "border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600"
              }`
            }
          >
            Thanh toán
          </NavLink>
          <NavLink
            to="/landlord/add-room"
            className={({ isActive }) =>
              `text-gray-200 transition duration-300 pr-5 pl-5 ${
                isActive
                  ? "border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600"
              }`
            }
          >
            Thêm phòng
          </NavLink>
        </div>

        {/* 🧍 Khu vực người dùng / đăng nhập */}
        <div className="hidden md:flex items-center space-x-4">
          {/* 👤 Nếu chưa đăng nhập */}
          {!user && (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 text-sm text-white border border-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 text-sm border border-blue-600 text-white rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Đăng ký
              </NavLink>
            </>
          )}

          {/* ✅ Nếu đã đăng nhập */}
          {user && (
            <div className="flex items-center gap-3 text-gray-200">
              <span className="font-semibold">
                👋 Xin chào, <span className="text-blue-400">{user.name}</span>
              </span>

              {/* 🌟 Nút điều hướng theo vai trò */}
              {user.role === "ADMIN" && (
                <button
                  onClick={() => navigate("/admin")}
                  className="px-3 py-1 bg-red-600 rounded-lg text-sm hover:bg-red-700 transition"
                >
                  Trang Admin
                </button>
              )}

              {user.role === "LANDLORD" && (
                <button
                  onClick={() => navigate("/landlord")}
                  className="px-3 py-1 bg-green-600 rounded-lg text-sm hover:bg-green-700 transition"
                >
                  Quản lý phòng
                </button>
              )}

              {user.role === "USER" && (
                <button
                  onClick={() => navigate(`/profile/${user.id}`)}
                  className="px-3 py-1 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition"
                >
                  Hồ sơ
                </button>
              )}

              {/* 🔓 Đăng xuất */}
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-gray-700 rounded-lg text-sm hover:bg-gray-600 transition"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
