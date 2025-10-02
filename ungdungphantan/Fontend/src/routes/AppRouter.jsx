import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Home from "../pages/Home";
import AuthPage from "../Component/AuthForm";
import Room from "../pages/SearchPage";

export default function AppRouter() {
  return (
    <>
      {/* Navbar luôn xuất hiện */}
      <Navbar />

      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<Home />} />

        {/* Trang login và register */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        {/* Tang tìm kiếm phòng*/}
        <Route path="/rooms" element={<Room />} />
        {/* Nếu nhập sai URL → quay về home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer luôn xuất hiện */}
      <Footer />
    </>
  );
}
