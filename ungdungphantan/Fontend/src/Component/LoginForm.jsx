import { useState } from "react";
import bgImage from "../assets/imgs/background.jpg";
import { loginUser } from "../api/userApi";

export default function LoginForm({ onSwitch }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await loginUser({
      email: form.email,
      password: form.password,
    });

    if (res.token) {
      localStorage.setItem("token", res.token);
      setMessage("✅ Đăng nhập thành công!");
    } else {
      setMessage(res.message || "❌ Sai thông tin đăng nhập");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay mờ */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Form */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-xl backdrop-blur-sm">
        {/* Header */}
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Đăng nhập
        </h2>
        <p className="mt-2 text-center text-gray-500">
          Chào mừng bạn quay lại 👋
        </p>

        {/* Form input */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
              placeholder="********"
              required
            />
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
          >
            Đăng nhập
          </button>

          {/* Thông báo */}
          {message && (
            <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
          )}

          {/* Link sang đăng ký */}
          <p className="text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <button
              type="button"
              onClick={onSwitch}
              className="font-semibold text-indigo-600 hover:underline"
            >
              Đăng ký ngay
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
