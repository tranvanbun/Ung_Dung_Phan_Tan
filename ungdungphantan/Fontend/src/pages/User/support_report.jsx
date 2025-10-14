import React, { useState } from "react";

export default function SupportReport() {
  const [activeTab, setActiveTab] = useState("tickets"); // "tickets", "create"
  const [filterStatus, setFilterStatus] = useState(null); // null, "open", "in_progress", "resolved"

  // Form state
  const [form, setForm] = useState({
    title: "",
    category: "general",
    priority: "normal",
    description: "",
  });

  // Mock data - Danh sách ticket của user
  const tickets = [
    {
      id: 1,
      title: "Điều hòa phòng bị hỏng",
      category: "maintenance",
      priority: "high",
      status: "in_progress",
      description: "Điều hòa không lạnh, cần sửa chữa gấp",
      createdAt: "2024-10-10T10:30:00",
      response: "Chúng tôi đã ghi nhận và sẽ cử thợ đến sửa trong 24h",
    },
    {
      id: 2,
      title: "Hỏi về hợp đồng gia hạn",
      category: "general",
      priority: "normal",
      status: "resolved",
      description: "Muốn gia hạn hợp đồng thêm 6 tháng",
      createdAt: "2024-10-08T14:20:00",
      response: "Hợp đồng đã được gia hạn thành công",
      resolvedAt: "2024-10-09T09:00:00",
    },
    {
      id: 3,
      title: "Thanh toán bị lỗi",
      category: "payment",
      priority: "high",
      status: "open",
      description: "Chuyển khoản nhưng chưa thấy cập nhật",
      createdAt: "2024-10-13T16:45:00",
    },
  ];

  // Filter tickets
  const filteredTickets = filterStatus
    ? tickets.filter((t) => t.status === filterStatus)
    : tickets;

  // Status colors & labels
  const statusConfig = {
    open: { color: "bg-yellow-100 text-yellow-700", label: "Chờ xử lý" },
    in_progress: { color: "bg-blue-100 text-blue-700", label: "Đang xử lý" },
    resolved: { color: "bg-green-100 text-green-700", label: "Đã giải quyết" },
  };

  const priorityConfig = {
    low: { color: "bg-gray-100 text-gray-700", label: "Thấp" },
    normal: { color: "bg-blue-100 text-blue-700", label: "Bình thường" },
    high: { color: "bg-red-100 text-red-700", label: "Cao" },
  };

  const categoryLabels = {
    general: "Tổng quát",
    maintenance: "Bảo trì",
    payment: "Thanh toán",
    contract: "Hợp đồng",
    complaint: "Khiếu nại",
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tạo ticket mới:", form);
    alert("Ticket đã được gửi thành công!");
    setForm({
      title: "",
      category: "general",
      priority: "normal",
      description: "",
    });
    setActiveTab("tickets");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 mt-20">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎫 Hỗ trợ & Báo cáo
          </h1>
          <p className="text-gray-600">Gửi yêu cầu hỗ trợ hoặc báo cáo sự cố</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          <button
            onClick={() => setActiveTab("tickets")}
            className={`px-6 py-3 font-medium transition ${
              activeTab === "tickets"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            📋 Danh sách yêu cầu ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-6 py-3 font-medium transition ${
              activeTab === "create"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            ➕ Tạo yêu cầu mới
          </button>
        </div>

        {/* TAB 1: Danh sách ticket */}
        {activeTab === "tickets" && (
          <div>
            {/* Filters */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setFilterStatus(null)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === null
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilterStatus("open")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === "open"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Chờ xử lý
              </button>
              <button
                onClick={() => setFilterStatus("in_progress")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === "in_progress"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Đang xử lý
              </button>
              <button
                onClick={() => setFilterStatus("resolved")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === "resolved"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Đã giải quyết
              </button>
            </div>

            {/* Tickets List */}
            {filteredTickets.length > 0 ? (
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-gray-500 font-mono text-sm">
                            #{ticket.id}
                          </span>
                          <h3 className="text-xl font-bold text-gray-800">
                            {ticket.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`px-3 py-1 text-xs rounded-full font-medium ${
                              statusConfig[ticket.status].color
                            }`}
                          >
                            {statusConfig[ticket.status].label}
                          </span>
                          <span
                            className={`px-3 py-1 text-xs rounded-full font-medium ${
                              priorityConfig[ticket.priority].color
                            }`}
                          >
                            {priorityConfig[ticket.priority].label}
                          </span>
                          <span className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full font-medium">
                            {categoryLabels[ticket.category]}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          {ticket.description}
                        </p>
                        <p className="text-gray-400 text-sm">
                          📅 Tạo lúc:{" "}
                          {new Date(ticket.createdAt).toLocaleString("vi-VN")}
                        </p>
                      </div>
                    </div>

                    {/* Response */}
                    {ticket.response && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          💬 Phản hồi từ Admin:
                        </p>
                        <p className="text-blue-800">{ticket.response}</p>
                        {ticket.resolvedAt && (
                          <p className="text-blue-600 text-xs mt-2">
                            ✅ Giải quyết lúc:{" "}
                            {new Date(ticket.resolvedAt).toLocaleString(
                              "vi-VN"
                            )}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
                        📄 Chi tiết
                      </button>
                      {ticket.status !== "resolved" && (
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium">
                          ✏️ Cập nhật
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-500 text-lg mb-2">
                  Chưa có yêu cầu nào
                </p>
                <button
                  onClick={() => setActiveTab("create")}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  ➕ Tạo yêu cầu mới
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Tạo ticket mới */}
        {activeTab === "create" && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              ➕ Tạo yêu cầu mới
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tiêu đề */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="VD: Điều hòa phòng bị hỏng"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              {/* Category & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    <option value="general">Tổng quát</option>
                    <option value="maintenance">Bảo trì</option>
                    <option value="payment">Thanh toán</option>
                    <option value="contract">Hợp đồng</option>
                    <option value="complaint">Khiếu nại</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Độ ưu tiên
                  </label>
                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm({ ...form, priority: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    <option value="low">Thấp</option>
                    <option value="normal">Bình thường</option>
                    <option value="high">Cao</option>
                  </select>
                </div>
              </div>

              {/* Mô tả */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                  rows={6}
                  placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  ✉️ Gửi yêu cầu
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("tickets")}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
