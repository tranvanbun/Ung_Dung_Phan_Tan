const express = require("express");
const router = express.Router();
const supportTicketService = require("../modules/supportTicket.service");
const logger = require("../utils/logger");

// GET /api/support-tickets
router.get("/", async (req, res) => {
  try {
    const { userId, status } = req.query;
    logger.info(
      `GET /api/support-tickets - userId: ${userId}, status: ${status}`
    );

    const tickets = await supportTicketService.getAll(userId, status);
    res.json({ tickets });
  } catch (error) {
    logger.error("Error getting tickets:", error);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/support-tickets
router.post("/", async (req, res) => {
  try {
    logger.info("POST /api/support-tickets", req.body);

    const ticket = await supportTicketService.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    logger.error("Error creating ticket:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ PATCH /api/support-tickets/:id/status - ROUTE QUAN TRỌNG
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    logger.info(
      `PATCH /api/support-tickets/${id}/status - New status: ${status}`
    );

    const ticket = await supportTicketService.updateStatus(id, status);
    res.json(ticket);
  } catch (error) {
    logger.error("Error updating ticket status:", error);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/support-tickets/:id/reply
router.post("/:id/reply", async (req, res) => {
  try {
    const { id } = req.params;
    const { message, userId } = req.body;

    logger.info(`POST /api/support-tickets/${id}/reply`);

    const ticket = await supportTicketService.reply(id, message, userId);
    res.json(ticket);
  } catch (error) {
    logger.error("Error replying to ticket:", error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/support-tickets/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    logger.info(`DELETE /api/support-tickets/${id}`);

    await supportTicketService.delete(id);
    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    logger.error("Error deleting ticket:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
