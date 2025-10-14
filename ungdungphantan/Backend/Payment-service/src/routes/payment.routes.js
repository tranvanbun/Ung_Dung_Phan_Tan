import express from "express";
import { createPayment } from "../services/payment.service.js";

const router = express.Router();

router.post("/create", createPayment);

export default router;
