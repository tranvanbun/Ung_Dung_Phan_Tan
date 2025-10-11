import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AuthPage from "../Component/AuthForm";
import Room from "../pages/SearchPage";

// --- Admin Pages ---
import AdminDashboard from "../pages/Admin/Dashbord";
import RoomManagement from "../pages/Admin/room_management";
import TransactionManagement from "../pages/Admin/transaction_management";
import UserManagement from "../pages/Admin/user_management";

// --- Admin Layout ---
import AdminLayout from "../layouts/AdminLayout";

// --- User Layout ---
import UserLayout from "../layouts/UserLayout";

// --- Các trang Admin mới (tạo sau) ---
import NotificationManagement from "../pages/Admin/NotificationManagement";
import Settings from "../pages/Admin/setting";
import BuildingManagement from "../pages/Admin/BuildingManagement";
import ContractManagement from "../pages/Admin/ContractManagement";

export default function AppRouter() {
  return (
    <Routes>
      {/* --- Layout cho user --- */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/rooms" element={<Room />} />
      </Route>

      {/* --- Layout cho admin --- */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/room-management" element={<RoomManagement />} />
        <Route
          path="/admin/transaction-management"
          element={<TransactionManagement />}
        />
        <Route
          path="/admin/notifications"
          element={<NotificationManagement />}
        />
        <Route path="/admin/settings" element={<Settings />} />
        <Route
          path="/admin/building-management"
          element={<BuildingManagement />}
        />
        <Route
          path="/admin/contract-management"
          element={<ContractManagement />}
        />
      </Route>

      {/* --- Nếu nhập sai URL thì về trang chủ --- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
