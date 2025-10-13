import { useState, useEffect } from "react";
import {
  getNotifications,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} from "../../api/notificationApi";
import {
  getSupportTickets,
  createSupportTicket,
  updateTicketStatus,
  deleteTicket,
  getReports,
  createReport,
  updateReportStatus,
  deleteReport,
} from "../../api/supportReportApi";

// ==================== CONSTANTS ====================
const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  INVESTIGATING: "bg-blue-100 text-blue-700",
  RESOLVED: "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-700",
  REJECTED: "bg-red-100 text-red-700",
};

const PRIORITY_COLORS = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-orange-100 text-orange-700",
  LOW: "bg-gray-100 text-gray-700",
};

const STATUS_LABELS = {
  PENDING: "Chờ xử lý",
  IN_PROGRESS: "Đang xử lý",
  INVESTIGATING: "Đang điều tra",
  RESOLVED: "Đã giải quyết",
  CLOSED: "Đã đóng",
  REJECTED: "Từ chối",
};

const PRIORITY_LABELS = {
  HIGH: "Cao",
  MEDIUM: "Trung bình",
  LOW: "Thấp",
};

// ==================== COMPONENTS ====================

// Filter Buttons Component
const FilterButtons = ({ filters, active, onFilterChange }) => (
  <div className="flex gap-2">
    {filters.map(({ value, label }) => (
      <button
        key={value || "all"}
        onClick={() => onFilterChange(value)}
        className={`px-4 py-2 rounded-lg transition ${
          active === value
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

// Modal Component
const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Form Input Component
const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  required = true,
  ...props
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg"
        required={required}
        {...props}
      />
    ) : type === "select" ? (
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg"
        required={required}
        {...props}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg"
        required={required}
        {...props}
      />
    )}
  </div>
);

// ==================== MAIN COMPONENT ====================

export default function NotificationManagement() {
  const [activeSection, setActiveSection] = useState("notifications");
  const [loading, setLoading] = useState(false);
  const adminId = "admin001";

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filterRead, setFilterRead] = useState(null);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [notifForm, setNotifForm] = useState({
    userId: "",
    type: "SYSTEM",
    title: "",
    message: "",
  });

  // Tickets
  const [tickets, setTickets] = useState([]);
  const [filterTicketStatus, setFilterTicketStatus] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    userId: "",
    subject: "",
    description: "",
    priority: "MEDIUM",
  });

  // Reports
  const [reports, setReports] = useState([]);
  const [filterReportStatus, setFilterReportStatus] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    reporterId: "",
    reportedUserId: "",
    type: "SPAM",
    description: "",
  });

  // ==================== FETCH DATA ====================

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeSection === "notifications") {
          const [notifsData, countData] = await Promise.all([
            getNotifications(adminId, filterRead),
            getUnreadCount(adminId),
          ]);
          setNotifications(notifsData.notifications || []);
          setUnreadCount(countData.unreadCount || 0);
        } else if (activeSection === "support") {
          const data = await getSupportTickets(null, filterTicketStatus);
          setTickets(data.tickets || []);
        } else if (activeSection === "reports") {
          const data = await getReports(filterReportStatus);
          setReports(data.reports || []);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeSection, filterRead, filterTicketStatus, filterReportStatus]);

  // ==================== HANDLERS ====================

  const handleNotifSubmit = async (e) => {
    e.preventDefault();
    const result = await createNotification(notifForm);
    if (!result.message) {
      alert("✅ Tạo thành công!");
      setShowNotifModal(false);
      setNotifForm({ userId: "", type: "SYSTEM", title: "", message: "" });
      setActiveSection("notifications"); // Reload
    } else {
      alert("❌ " + result.message);
    }
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    const result = await createSupportTicket(ticketForm);
    if (!result.message) {
      alert("✅ Tạo thành công!");
      setShowTicketModal(false);
      setTicketForm({
        userId: "",
        subject: "",
        description: "",
        priority: "MEDIUM",
      });
      setActiveSection("support");
    } else {
      alert("❌ " + result.message);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    const result = await createReport(reportForm);
    if (!result.message) {
      alert("✅ Tạo thành công!");
      setShowReportModal(false);
      setReportForm({
        reporterId: "",
        reportedUserId: "",
        type: "SPAM",
        description: "",
      });
      setActiveSection("reports");
    } else {
      alert("❌ " + result.message);
    }
  };

  // ==================== RENDER ====================

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          📞 Quản lý Hỗ trợ & Thông báo
        </h1>
        <p className="text-gray-600 mt-2">
          Quản lý thông báo, support tickets và báo cáo
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveSection("notifications")}
          className={`px-6 py-3 rounded-lg font-medium transition ${
            activeSection === "notifications"
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          🔔 Thông báo {unreadCount > 0 && `(${unreadCount})`}
        </button>
        <button
          onClick={() => setActiveSection("support")}
          className={`px-6 py-3 rounded-lg font-medium transition ${
            activeSection === "support"
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          🎫 Support Tickets
        </button>
        <button
          onClick={() => setActiveSection("reports")}
          className={`px-6 py-3 rounded-lg font-medium transition ${
            activeSection === "reports"
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          📋 Báo cáo
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        ) : (
          <>
            {/* NOTIFICATIONS */}
            {activeSection === "notifications" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <FilterButtons
                    filters={[
                      { value: null, label: "Tất cả" },
                      { value: "false", label: "Chưa đọc" },
                      { value: "true", label: "Đã đọc" },
                    ]}
                    active={filterRead}
                    onFilterChange={setFilterRead}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        await markAllAsRead(adminId);
                        setActiveSection("notifications");
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      ✓ Đánh dấu tất cả
                    </button>
                    <button
                      onClick={() => setShowNotifModal(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      + Tạo mới
                    </button>
                  </div>
                </div>

                {notifications.length === 0 ? (
                  <p className="text-center text-gray-500 py-12">
                    Không có dữ liệu
                  </p>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-4 border rounded-lg ${
                          n.is_read
                            ? "bg-gray-50"
                            : "bg-blue-50 border-blue-300"
                        }`}
                      >
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                                {n.type}
                              </span>
                              {!n.is_read && (
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                              )}
                            </div>
                            <h3 className="font-semibold text-gray-800">
                              {n.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{n.message}</p>
                            <p className="text-gray-400 text-xs mt-1">
                              {new Date(n.created_at).toLocaleString("vi-VN")}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {!n.is_read && (
                              <button
                                onClick={async () => {
                                  await markAsRead(n.id, adminId);
                                  setActiveSection("notifications");
                                }}
                                className="px-3 py-1 bg-green-600 text-white text-sm rounded"
                              >
                                ✓
                              </button>
                            )}
                            <button
                              onClick={async () => {
                                if (confirm("Xóa?")) {
                                  await deleteNotification(n.id, adminId);
                                  setActiveSection("notifications");
                                }
                              }}
                              className="px-3 py-1 bg-red-600 text-white text-sm rounded"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SUPPORT TICKETS */}
            {activeSection === "support" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <FilterButtons
                    filters={[
                      { value: null, label: "Tất cả" },
                      { value: "open", label: "Chờ xử lý" },
                      { value: "in_progress", label: "Đang xử lý" },
                      { value: "resolved", label: "Đã xong" },
                    ]}
                    active={filterTicketStatus}
                    onFilterChange={setFilterTicketStatus}
                  />
                  {/* <button
                    onClick={() => setShowTicketModal(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    + Tạo mới
                  </button> */}
                </div>

                {tickets.length === 0 ? (
                  <p className="text-center text-gray-500 py-12">
                    Không có dữ liệu
                  </p>
                ) : (
                  <div className="space-y-3">
                    {tickets.map((t) => {
                      const status = t.status?.toLowerCase() || "open";

                      // ✅ Xác định trạng thái tiếp theo
                      const getNextStatus = () => {
                        if (status === "open") return "in_progress";
                        if (status === "in_progress") return "resolved";
                        return null; // Đã resolved thì không có next
                      };

                      const nextStatus = getNextStatus();

                      return (
                        <div
                          key={t.id}
                          className="p-4 border rounded-lg hover:shadow-md transition"
                        >
                          <div className="flex justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-gray-700">
                                  #{t.id}
                                </span>

                                {/* Status Badge */}
                                <span
                                  className={`px-2 py-1 text-xs rounded ${
                                    status === "open"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : status === "in_progress"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  {status === "open"
                                    ? "Chờ xử lý"
                                    : status === "in_progress"
                                    ? "Đang xử lý"
                                    : "Đã xong"}
                                </span>

                                {/* Priority Badge */}
                                <span
                                  className={`px-2 py-1 text-xs rounded ${
                                    t.priority?.toLowerCase() === "high"
                                      ? "bg-red-100 text-red-700"
                                      : t.priority?.toLowerCase() === "medium"
                                      ? "bg-orange-100 text-orange-700"
                                      : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {t.priority?.toLowerCase() === "high"
                                    ? "Cao"
                                    : t.priority?.toLowerCase() === "medium"
                                    ? "Trung bình"
                                    : "Thấp"}
                                </span>
                              </div>

                              <h3 className="font-semibold text-gray-800">
                                {t.title || t.subject}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {t.description}
                              </p>
                              <p className="text-gray-400 text-xs mt-1">
                                User: {t.userId} |{" "}
                                {new Date(
                                  t.created_at || t.createdAt
                                ).toLocaleString("vi-VN")}
                              </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2">
                              {/* ✅ NÚT GIẢI QUYẾT - Chỉ hiện khi chưa resolved */}
                              {nextStatus && (
                                <button
                                  onClick={async () => {
                                    await updateTicketStatus(t.id, nextStatus);
                                    setActiveSection("support"); // Reload
                                  }}
                                  className={`px-3 py-1 text-white text-sm rounded font-medium ${
                                    status === "open"
                                      ? "bg-blue-600 hover:bg-blue-700"
                                      : "bg-green-600 hover:bg-green-700"
                                  }`}
                                >
                                  ✓ Giải quyết
                                </button>
                              )}

                              {/* ✅ Badge "Hoàn thành" khi đã resolved */}
                              {status === "resolved" && (
                                <div className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded text-center font-medium">
                                  ✓ Hoàn thành
                                </div>
                              )}

                              {/* Delete Button */}
                              <button
                                onClick={async () => {
                                  if (confirm("Xóa ticket này?")) {
                                    await deleteTicket(t.id);
                                    setActiveSection("support");
                                  }
                                }}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* REPORTS */}
            {activeSection === "reports" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <FilterButtons
                    filters={[
                      { value: null, label: "Tất cả" },
                      { value: "PENDING", label: "Chờ xử lý" },
                      { value: "INVESTIGATING", label: "Đang điều tra" },
                      { value: "RESOLVED", label: "Đã giải quyết" },
                    ]}
                    active={filterReportStatus}
                    onFilterChange={setFilterReportStatus}
                  />
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    + Tạo mới
                  </button>
                </div>

                {reports.length === 0 ? (
                  <p className="text-center text-gray-500 py-12">
                    Không có dữ liệu
                  </p>
                ) : (
                  <div className="space-y-3">
                    {reports.map((r) => (
                      <div
                        key={r.id}
                        className="p-4 border rounded-lg hover:shadow-md transition"
                      >
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-gray-700">
                                🚨 #{r.id}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs rounded ${
                                  STATUS_COLORS[r.status]
                                }`}
                              >
                                {STATUS_LABELS[r.status]}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {r.type}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {r.description}
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                              {r.reporterId} → {r.reportedUserId} |{" "}
                              {new Date(r.createdAt).toLocaleString("vi-VN")}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            {r.status !== "RESOLVED" && (
                              <>
                                <button
                                  onClick={async () => {
                                    await updateReportStatus(
                                      r.id,
                                      "INVESTIGATING"
                                    );
                                    setActiveSection("reports");
                                  }}
                                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                                >
                                  🔍 Điều tra
                                </button>
                                <button
                                  onClick={async () => {
                                    await updateReportStatus(
                                      r.id,
                                      "RESOLVED",
                                      "Đã xử lý"
                                    );
                                    setActiveSection("reports");
                                  }}
                                  className="px-3 py-1 bg-green-600 text-white text-sm rounded"
                                >
                                  ✓ Giải quyết
                                </button>
                              </>
                            )}
                            <button
                              onClick={async () => {
                                if (confirm("Xóa?")) {
                                  await deleteReport(r.id);
                                  setActiveSection("reports");
                                }
                              }}
                              className="px-3 py-1 bg-red-600 text-white text-sm rounded"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* MODALS */}
      <Modal
        show={showNotifModal}
        onClose={() => setShowNotifModal(false)}
        title="Tạo thông báo mới"
      >
        <form onSubmit={handleNotifSubmit} className="space-y-4">
          <FormInput
            label="User ID"
            value={notifForm.userId}
            onChange={(e) =>
              setNotifForm({ ...notifForm, userId: e.target.value })
            }
          />
          <FormInput
            label="Loại"
            type="select"
            value={notifForm.type}
            onChange={(e) =>
              setNotifForm({ ...notifForm, type: e.target.value })
            }
          >
            <option value="SYSTEM">SYSTEM</option>
            <option value="PAYMENT">PAYMENT</option>
            <option value="ROOM">ROOM</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
          </FormInput>
          <FormInput
            label="Tiêu đề"
            value={notifForm.title}
            onChange={(e) =>
              setNotifForm({ ...notifForm, title: e.target.value })
            }
          />
          <FormInput
            label="Nội dung"
            type="textarea"
            rows="4"
            value={notifForm.message}
            onChange={(e) =>
              setNotifForm({ ...notifForm, message: e.target.value })
            }
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
            >
              Tạo
            </button>
            <button
              type="button"
              onClick={() => setShowNotifModal(false)}
              className="flex-1 bg-gray-300 py-2 rounded-lg"
            >
              Hủy
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        show={showReportModal}
        onClose={() => setShowReportModal(false)}
        title="Tạo báo cáo mới"
      >
        <form onSubmit={handleReportSubmit} className="space-y-4">
          <FormInput
            label="Reporter ID"
            value={reportForm.reporterId}
            onChange={(e) =>
              setReportForm({ ...reportForm, reporterId: e.target.value })
            }
          />
          <FormInput
            label="Reported User ID"
            value={reportForm.reportedUserId}
            onChange={(e) =>
              setReportForm({ ...reportForm, reportedUserId: e.target.value })
            }
          />
          <FormInput
            label="Loại"
            type="select"
            value={reportForm.type}
            onChange={(e) =>
              setReportForm({ ...reportForm, type: e.target.value })
            }
          >
            <option value="SPAM">SPAM</option>
            <option value="HARASSMENT">HARASSMENT</option>
            <option value="FRAUD">FRAUD</option>
            <option value="INAPPROPRIATE_CONTENT">INAPPROPRIATE CONTENT</option>
            <option value="OTHER">OTHER</option>
          </FormInput>
          <FormInput
            label="Mô tả"
            type="textarea"
            rows="4"
            value={reportForm.description}
            onChange={(e) =>
              setReportForm({ ...reportForm, description: e.target.value })
            }
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
            >
              Tạo
            </button>
            <button
              type="button"
              onClick={() => setShowReportModal(false)}
              className="flex-1 bg-gray-300 py-2 rounded-lg"
            >
              Hủy
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
