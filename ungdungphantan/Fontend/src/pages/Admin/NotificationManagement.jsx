export default function NotificationManagement() {
  const notifications = [
    {
      title: "Cập nhật giá điện",
      content: "Giá điện tháng 10 đã thay đổi",
      date: "08/10/2025",
    },
    {
      title: "Bảo trì hệ thống",
      content: "Hệ thống sẽ bảo trì lúc 23h ngày 12/10",
      date: "09/10/2025",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Thông báo</h1>

      <div className="space-y-4">
        {notifications.map((n, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="font-semibold text-indigo-600">{n.title}</h2>
            <p className="text-gray-700">{n.content}</p>
            <p className="text-gray-400 text-sm mt-1">📅 {n.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
