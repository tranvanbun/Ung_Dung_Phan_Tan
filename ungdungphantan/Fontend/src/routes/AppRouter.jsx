import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AuthPage from "../Component/AuthForm";
import Room from "../pages/SearchPage";
import AdminDashboard from "../pages/Admin/Dashbord";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

export default function AppRouter() {
  return (
    <Routes>
      {/* Layout cho user */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/rooms" element={<Room />} />
      </Route>

      {/* Layout cho admin */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* Sai URL thì về Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
