import express from "express";
import {
  upsertBankConfig,
  getBankConfig,
} from "../services/bankConfig.service.js";

const router = express.Router();

router.get("/:landlordId", getBankConfig);
router.post("/", upsertBankConfig);

export default router;
