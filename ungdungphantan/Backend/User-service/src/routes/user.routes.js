// src/routes/user.routes.js
import express from "express";
import * as AuthService from "../modules/auth.service.js";
import { getUsers } from "../modules/user.service.js";

const router = express.Router();

// 📄 Lấy danh sách người dùng
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({
      message: "Lấy danh sách người dùng thành công",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🧑‍💻 Đăng ký người dùng mới
router.post("/register", async (req, res) => {
  try {
    const result = await AuthService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
