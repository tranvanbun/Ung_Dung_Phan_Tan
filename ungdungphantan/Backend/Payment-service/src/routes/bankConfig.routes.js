import express from "express";
import { upsertBankConfig, getBankConfig } from "../services/bankConfig.service.js";

const router = express.Router();

router.get("/:landlordId", getBankConfig);
router.put("/:landlordId", upsertBankConfig);

export default router;
