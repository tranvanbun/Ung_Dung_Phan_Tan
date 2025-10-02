import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Users, Home, Bed, DollarSign } from "lucide-react";
import Sidebar from "../../Component/Sidebar";

export default function AdminDashboard() {
  // Năm hiện tại
  const [year, setYear] = useState(2024);

  // Dữ liệu mẫu cho nhiều năm
  const yearlyData = {
    2023: [5, 10, 15, 20, 25, 30, 28, 35, 40, 32, 20, 15],
    2024: [25, 45, 35, 28, 32, 40, 50, 55, 42, 38, 30, 20],
    2025: [15, 25, 20, 18, 22, 28, 30, 32, 25, 27, 18, 12],
  };

  // Sinh đủ 12 tháng
  const data = Array.from({ length: 12 }, (_, i) => ({
    month: `Th${i + 1}`,
    users: yearlyData[year]?.[i] || 0,
  }));

  const [activeMenu, setActiveMenu] = useState("Bảng điều khiển");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">{activeMenu}</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng số người dùng</p>
              <h2 className="text-2xl font-bold">15</h2>
            </div>
            <Users className="text-gray-400" size={32} />
          </div>

          <div className="bg-white shadow rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tài sản</p>
              <h2 className="text-2xl font-bold">8</h2>
            </div>
            <Home className="text-gray-400" size={32} />
          </div>

          <div className="bg-white shadow rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Còn trống</p>
              <h2 className="text-2xl font-bold">12</h2>
            </div>
            <Bed className="text-gray-400" size={32} />
          </div>

          <div className="bg-white shadow rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Doanh thu</p>
              <h2 className="text-2xl font-bold">1.200 USD</h2>
            </div>
            <DollarSign className="text-gray-400" size={32} />
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white shadow rounded-xl p-6">
          {/* Header có chọn năm */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Đăng ký người dùng</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setYear(year - 1)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                ◀
              </button>
              <span className="text-lg font-semibold">{year}</span>
              <button
                onClick={() => setYear(year + 1)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                ▶
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data} barSize={45}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: "#374151", fontSize: 14 }} />
              <YAxis tick={{ fill: "#374151", fontSize: 14 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
                cursor={{ fill: "rgba(99,102,241,0.1)" }}
              />
              <Bar
                dataKey="users"
                fill="url(#colorUsers)"
                radius={[10, 10, 0, 0]}
                activeBar={{ fill: "#4338ca" }}
              >
                <LabelList
                  dataKey="users"
                  position="top"
                  fill="#111827"
                  fontSize={13}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
