import { Bell, Mail } from "lucide-react";

export default function AdminNavbar() {
  const user = {
    name: "Đức",
    avatar: "https://i.pravatar.cc/40",
  };

  return (
    <nav className="bg-gray-800 px-6 py-3 flex justify-between items-center">
      {/* Bên trái: Logo */}
      <div className="text-white text-xl font-bold">Admin Panel</div>

      {/* Bên phải: Icon + User */}
      <div className="flex items-center gap-5">
        {/* Icon chuông */}
        <button className="text-white hover:text-gray-300 mr-10">
          <Bell size={22} />
        </button>

        {/* Icon thư */}
        <button className="text-white hover:text-gray-300 mr-10">
          <Mail size={22} />
        </button>

        {/* Hi, Name + Avatar */}
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full border border-gray-600"
          />
        </div>
        <span className="text-white text-xl font-semibold mr-10">
          Hi, {user.name}
        </span>
      </div>
    </nav>
  );
}
