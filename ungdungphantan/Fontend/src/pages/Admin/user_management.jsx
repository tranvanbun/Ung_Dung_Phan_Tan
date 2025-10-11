import { useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";

export default function UserManagement() {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      role: "Người thuê",
      createdAt: "2025-01-01",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "b@gmail.com",
      role: "Chủ trọ",
      createdAt: "2025-03-12",
    },
    {
      id: 3,
      name: "Admin Hệ thống",
      email: "admin@gmail.com",
      role: "Admin",
      createdAt: "2024-12-05",
    },
  ];

  // 🎨 Hàm chọn màu nền cho từng vai trò
  const getRoleStyle = (role) => {
    switch (role) {
      case "Admin":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Chủ trọ":
        return "bg-green-100 text-green-800 border-green-300";
      case "Người thuê":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="p-6">
      {/* --- Header + Search --- */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Quản lý người dùng</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* --- Table --- */}
      <table className="w-full border-collapse bg-white rounded-lg shadow-md">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-3 text-left">Họ tên</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Vai trò</th>
            <th className="p-3 text-left">Ngày tạo</th>
            <th className="p-3 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 text-sm font-medium border rounded-full ${getRoleStyle(
                    u.role
                  )}`}
                >
                  {u.role}
                </span>
              </td>
              <td className="p-3">{u.createdAt}</td>
              <td className="p-3 text-center space-x-3">
                <button className="text-indigo-500 hover:text-indigo-700">
                  <Pencil size={18} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
