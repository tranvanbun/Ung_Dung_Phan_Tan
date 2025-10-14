import { useState, useEffect, useCallback } from "react";
import {
  loginUser,
  getCurrentUser,
  refreshTokenApi,
  logoutUserApi,
  setupAxiosInterceptors,
} from "../api/userApi";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ============================================
  // 🔐 LOGIN
  // ============================================
  const login = useCallback(async (credentials) => {
    try {
      const data = await loginUser(credentials);

      if (data.success) {
        // Lưu token và user vào localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setUser(data.user);
        setIsAuthenticated(true);

        return { success: true };
      }

      return { success: false, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Đăng nhập thất bại",
      };
    }
  }, []);

  // ============================================
  // 🚪 LOGOUT
  // ============================================
  const logout = useCallback(async () => {
    try {
      await logoutUserApi();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Xóa dữ liệu local
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // ============================================
  // 🔄 REFRESH TOKEN
  // ============================================
  const refreshToken = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return false;

      const data = await refreshTokenApi(token);

      if (data.success) {
        localStorage.setItem("token", data.token);
        return true;
      }

      return false;
    } catch (err) {
      console.error("Refresh token error:", err);
      logout();
      return false;
    }
  }, [logout]);

  // ============================================
  // 📥 FETCH USER
  // ============================================
  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const data = await getCurrentUser();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Fetch user error:", err);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  // ============================================
  // 🚀 INIT: Load user khi component mount
  // ============================================
  useEffect(() => {
    // Setup axios interceptors với callback logout
    setupAxiosInterceptors(logout);

    // Load user từ localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Parse user error:", err);
      }
    }

    // Fetch user info from server
    fetchUser();
  }, [fetchUser, logout]);

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshToken,
    fetchUser,
  };
}
