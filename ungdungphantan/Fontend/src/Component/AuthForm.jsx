import React, { useState } from "react";
import bgImage from "../assets/imgs/background.jpg"; // 👈 ảnh trong dự án

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay màu đen trong suốt để dễ đọc chữ */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-xl backdrop-blur-sm">
        {/* Header */}
        <h2 className="text-center text-3xl font-bold text-gray-800">
          {isLogin ? "Đăng nhập" : "Đăng ký"}
        </h2>
        <p className="mt-2 text-center text-gray-500">
          {isLogin
            ? "Chào mừng bạn quay lại!"
            : "Tạo tài khoản mới ngay hôm nay 🚀"}
        </p>

        {/* Form */}
        <form className="mt-8 space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
                placeholder="Nguyễn Văn A"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
              placeholder="********"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
                placeholder="********"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
          >
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? (
            <p>
              Chưa có tài khoản?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="font-semibold text-indigo-600 hover:underline"
              >
                Đăng ký ngay
              </button>
            </p>
          ) : (
            <p>
              Đã có tài khoản?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="font-semibold text-indigo-600 hover:underline"
              >
                Đăng nhập
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
