const { Ticket } = require("../models");
const ApiError = require("../utils/apiError");

// Lấy tất cả vé
exports.getAllTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.findAll();
    res.json({ success: true, data: tickets });
  } catch (error) {
    next(error);
  }
};

// Lấy tất cả vé của một người dùng
exports.getUserTickets = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tickets = await Ticket.findAll({ where: { user_id: userId } });
    res.json({ success: true, data: tickets });
  } catch (error) {
    next(error);
  }
};

// Đặt vé
exports.bookTicket = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { seat_id, showtime_id, price } = req.body;

    const newTicket = await Ticket.create({
      user_id: userId,
      seat_id,
      showtime_id,
      price,
      status: "unused",
    });

    res.status(201).json({ success: true, data: newTicket });
  } catch (error) {
    next(error);
  }
};

// Hủy vé
exports.cancelTicket = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const ticket = await Ticket.findByPk(id);
    if (!ticket) return next(new ApiError(404, "Vé không tồn tại."));

    if (ticket.user_id !== userId) {
      return next(new ApiError(403, "Bạn không thể hủy vé của người khác."));
    }

    if (ticket.status !== "unused") {
      return next(new ApiError(400, "Chỉ có thể hủy vé chưa sử dụng."));
    }

    ticket.status = "refunded";
    await ticket.save();

    res.json({ success: true, message: "Vé đã được hủy và hoàn tiền." });
  } catch (error) {
    next(error);
  }
};

// Xóa vé
exports.deleteTicket = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByPk(id);
    if (!ticket) return next(new ApiError(404, "Vé không tồn tại."));

    if (ticket.status === "unused") {
      return next(new ApiError(400, "Không thể xóa vé chưa sử dụng."));
    }

    await ticket.destroy();
    res.json({ success: true, message: "Vé đã được xóa." });
  } catch (error) {
    next(error);
  }
};
