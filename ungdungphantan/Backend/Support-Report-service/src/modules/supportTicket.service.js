const { PrismaClient } = require("@prisma/client");
const logger = require("../utils/logger");
const prisma = new PrismaClient();

class SupportTicketService {
  // Tạo ticket mới
  async createTicket(data) {
    try {
      logger.info("Creating ticket", { userId: data.userId });

      const ticket = await prisma.support_tickets.create({
        data: {
          userId: data.userId,
          userRole: data.userRole,
          title: data.title,
          description: data.description,
          category: data.category || "GENERAL",
          status: "open",
          priority: data.priority || "normal",
          attachments: data.attachments || null,
          updated_at: new Date(),
        },
      });

      logger.success("Ticket created", { ticketId: ticket.id });
      return ticket;
    } catch (error) {
      logger.error("Create ticket failed", { error: error.message });
      throw new Error(`Error creating ticket: ${error.message}`);
    }
  }

  // Lấy tất cả tickets
  async getAllTickets(filters = {}) {
    try {
      const { userId, status, category, limit = 50, offset = 0 } = filters;

      const where = {};
      if (userId) where.userId = userId;
      if (status) where.status = status;
      if (category) where.category = category;

      const tickets = await prisma.support_tickets.findMany({
        where,
        orderBy: { created_at: "desc" },
        take: parseInt(limit),
        skip: parseInt(offset),
      });

      const total = await prisma.support_tickets.count({ where });

      return {
        tickets,
        pagination: { total, limit: parseInt(limit), offset: parseInt(offset) },
      };
    } catch (error) {
      logger.error("Get tickets failed", { error: error.message });
      throw new Error(`Error fetching tickets: ${error.message}`);
    }
  }

  // Lấy ticket theo ID
  async getTicketById(ticketId) {
    try {
      const ticket = await prisma.support_tickets.findUnique({
        where: { id: parseInt(ticketId) },
      });

      if (!ticket) throw new Error("Ticket not found");
      return ticket;
    } catch (error) {
      logger.error("Get ticket failed", { error: error.message });
      throw new Error(`Error fetching ticket: ${error.message}`);
    }
  }

  // ✅ THÊM METHOD NÀY - UPDATE STATUS
  async updateStatus(ticketId, status) {
    try {
      logger.info("Updating ticket status", { ticketId, status });

      const ticket = await prisma.support_tickets.findUnique({
        where: { id: parseInt(ticketId) },
      });

      if (!ticket) throw new Error("Ticket not found");

      const updated = await prisma.support_tickets.update({
        where: { id: parseInt(ticketId) },
        data: {
          status: status.toLowerCase(), // "IN_PROGRESS" → "in_progress"
          updated_at: new Date(),
          // Nếu status là resolved hoặc closed thì set resolved_at
          ...(status.toLowerCase() === "resolved" ||
          status.toLowerCase() === "closed"
            ? { resolved_at: new Date() }
            : {}),
        },
      });

      logger.success("Ticket status updated", { ticketId, status });
      return updated;
    } catch (error) {
      logger.error("Update status failed", { error: error.message });
      throw new Error(`Error updating status: ${error.message}`);
    }
  }

  // Cập nhật ticket (dùng cho tất cả: update, assign, respond, close)
  async updateTicket(ticketId, userId, data) {
    try {
      logger.info("Updating ticket", { ticketId, userId });

      const ticket = await prisma.support_tickets.findUnique({
        where: { id: parseInt(ticketId) },
      });

      if (!ticket) throw new Error("Ticket not found");

      // Check quyền: User chỉ update ticket của mình, Admin update tất cả
      if (ticket.userId !== userId && data.userRole !== "ADMIN") {
        throw new Error("Unauthorized");
      }

      const updated = await prisma.support_tickets.update({
        where: { id: parseInt(ticketId) },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.description && { description: data.description }),
          ...(data.status && { status: data.status }),
          ...(data.priority && { priority: data.priority }),
          ...(data.assignedTo && { assignedTo: data.assignedTo }),
          ...(data.response && { response: data.response }),
          ...(data.attachments && { attachments: data.attachments }),
          updated_at: new Date(),
          // Nếu đóng ticket thì set resolvedAt
          ...(data.status === "closed" && { resolved_at: new Date() }),
          ...(data.status === "resolved" && { resolved_at: new Date() }),
        },
      });

      logger.success("Ticket updated", { ticketId });
      return updated;
    } catch (error) {
      logger.error("Update ticket failed", { error: error.message });
      throw new Error(`Error updating ticket: ${error.message}`);
    }
  }

  // Xóa ticket
  async deleteTicket(ticketId, userId, userRole) {
    try {
      logger.info("Deleting ticket", { ticketId });

      const ticket = await prisma.support_tickets.findUnique({
        where: { id: parseInt(ticketId) },
      });

      if (!ticket) throw new Error("Ticket not found");

      // Check quyền
      if (ticket.userId !== userId && userRole !== "ADMIN") {
        throw new Error("Unauthorized");
      }

      await prisma.support_tickets.delete({
        where: { id: parseInt(ticketId) },
      });

      logger.success("Ticket deleted", { ticketId });
      return { success: true, message: "Ticket deleted" };
    } catch (error) {
      logger.error("Delete ticket failed", { error: error.message });
      throw new Error(`Error deleting ticket: ${error.message}`);
    }
  }

  // ✅ THÊM METHOD CREATE CHO ROUTES (alias của createTicket)
  async create(data) {
    return this.createTicket(data);
  }

  // ✅ THÊM METHOD GETALL CHO ROUTES (alias của getAllTickets)
  async getAll(userId, status) {
    const result = await this.getAllTickets({ userId, status });
    return result.tickets; // Chỉ trả về array tickets thôi
  }

  // ✅ THÊM METHOD DELETE CHO ROUTES
  async delete(ticketId) {
    // Tạm thời không check quyền, sau sẽ lấy từ JWT
    return this.deleteTicket(ticketId, null, "ADMIN");
  }
}

module.exports = new SupportTicketService();
