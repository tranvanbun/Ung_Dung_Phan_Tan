import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/imgs/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-[#0B121B] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo + Brand */}
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold text-gray-200">
            <span className="text-2xl text-teal-400">N</span>hóm 9
          </span>
        </NavLink>
        {/* Menu */}
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
        </div>

        {/* Nút đăng nhập / đăng ký */}
        <div className="hidden md:flex space-x-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
