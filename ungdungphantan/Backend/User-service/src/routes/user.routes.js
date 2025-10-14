import express from "express";
import { registerUser } from "../modules/user.service.js";
import { getUserById } from "../modules/user.service.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const result = await getUserById(req,res);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
export default router;
