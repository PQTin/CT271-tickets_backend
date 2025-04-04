const { Showtime, Movie, Room, Ticket, Seat } = require("../models");
const ApiError = require("../utils/apiError");
const { Op } = require("sequelize");

// Lấy tất cả suất chiếu
const getAllShowtimes = async (req, res, next) => {
  try {
    const showtimes = await Showtime.findAll({
      include: [{ model: Movie }, { model: Room, attributes: ["name"] }],
    });
    res.json({ success: true, data: showtimes });
  } catch (error) {
    next(error);
  }
};

// Thêm suất chiếu mới
const createShowtime = async (req, res, next) => {
  try {
    const { movie_id, room_id, start_time, end_time, price } = req.body;
    if (!movie_id || !room_id || !start_time || !end_time || !price) {
      throw new ApiError(400, "Vui lòng cung cấp đầy đủ thông tin");
    }

    if (start_time >= end_time) {
      throw new ApiError(
        400,
        "Thời gian bắt đầu phải trước thời gian kết thúc"
      );
    }

    // Kiểm tra trùng suất chiếu trong phòng
    const overlappingShowtime = await Showtime.findOne({
      where: {
        room_id: room_id, // Cùng phòng chiếu
        [Op.or]: [
          {
            start_time: { [Op.between]: [start_time, end_time] }, // Trùng giờ bắt đầu với suất cũ
          },
          {
            end_time: { [Op.between]: [start_time, end_time] }, // Trùng giờ kết thúc với suất cũ
          },
          {
            start_time: { [Op.lte]: start_time }, // Suất mới nằm trong suất cũ
            end_time: { [Op.gte]: end_time },
          },
          {
            start_time: { [Op.gte]: start_time }, // Suất cũ nằm trong suất mới
            end_time: { [Op.lte]: end_time },
          },
          {
            start_time: { [Op.lt]: start_time }, // Suất mới bắt đầu trước và kết thúc sau suất cũ
            end_time: { [Op.gt]: end_time },
          },
        ],
      },
    });

    if (overlappingShowtime) {
      throw new ApiError(
        400,
        "Suất chiếu bị trùng giờ với suất khác trong cùng phòng!"
      );
    }

    const showtime = await Showtime.create({
      movie_id,
      room_id,
      start_time,
      end_time,
      price,
    });
    res.status(201).json({ success: true, data: showtime });
  } catch (error) {
    next(error);
  }
};

// Cập nhật suất chiếu

const updateShowtime = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { start_time, end_time, price } = req.body;
    if (start_time >= end_time) {
      throw new ApiError(
        400,
        "Thời gian bắt đầu phải trước thời gian kết thúc"
      );
    }

    const showtime = await Showtime.findByPk(id);
    // Kiểm tra trùng suất chiếu (loại trừ suất chiếu hiện tại)
    const overlappingShowtime = await Showtime.findOne({
      where: {
        room_id: showtime.room_id,
        id: { [Op.ne]: id }, // Loại trừ chính suất chiếu đang cập nhật
        [Op.or]: [
          {
            start_time: { [Op.between]: [start_time, end_time] }, // Trùng giờ bắt đầu với suất cũ
          },
          {
            end_time: { [Op.between]: [start_time, end_time] }, // Trùng giờ kết thúc với suất cũ
          },
          {
            start_time: { [Op.lte]: start_time }, // Suất mới nằm trong suất cũ
            end_time: { [Op.gte]: end_time },
          },
          {
            start_time: { [Op.gte]: start_time }, // Suất cũ nằm trong suất mới
            end_time: { [Op.lte]: end_time },
          },
          {
            start_time: { [Op.lt]: start_time }, // Suất mới bắt đầu trước và kết thúc sau suất cũ
            end_time: { [Op.gt]: end_time },
          },
        ],
      },
    });

    if (overlappingShowtime) {
      throw new ApiError(
        400,
        "Suất chiếu bị trùng giờ với suất khác trong cùng phòng!"
      );
    }

    await showtime.update({ start_time, end_time, price });
    res.json({ success: true, data: showtime });
  } catch (error) {
    next(error);
  }
};

// Xóa suất chiếu
const deleteShowtime = async (req, res, next) => {
  try {
    const { id } = req.params;

    const showtime = await Showtime.findByPk(id);
    if (!showtime) throw new ApiError(404, "Suất chiếu không tồn tại");

    // Lấy danh sách vé liên quan
    const tickets = await Ticket.findAll({ where: { showtime_id: id } });

    if (tickets.length > 0) {
      // Kiểm tra có vé nào đang ở trạng thái "unused" không
      const hasValidTickets = tickets.some(
        (ticket) => ticket.status === "unused"
      );

      if (hasValidTickets) {
        throw new ApiError(
          400,
          "Không thể xóa suất chiếu vì đã có vé được bán và chưa sử dụng"
        );
      }

      // Nếu chỉ có vé "used" hoặc "expired", xóa tất cả vé trước khi xóa suất chiếu
      await Ticket.destroy({ where: { showtime_id: id } });
    }

    // Xóa suất chiếu
    await showtime.destroy();
    res.json({ success: true, message: "Xóa suất chiếu thành công" });
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách ghế  của một suất chiếu
const getSeats = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Kiểm tra suất chiếu có tồn tại không
    const showtime = await Showtime.findByPk(id);
    if (!showtime) {
      throw new ApiError(404, "Suất chiếu không tồn tại");
    }

    // Lấy phòng chiếu của suất chiếu
    const room = await Room.findByPk(showtime.room_id);
    if (!room) {
      throw new ApiError(404, "Phòng chiếu không tồn tại");
    }

    // Lấy danh sách tất cả ghế trong phòng
    const allSeats = await Seat.findAll({
      where: { room_id: room.id },
      attributes: ["id", "seat_number"],
    });

    if (allSeats.length === 0) {
      throw new ApiError(404, "Không có ghế nào trong phòng chiếu này");
    }

    // Lấy danh sách ghế đã đặt (trừ vé có trạng thái "refunded")
    const bookedSeats = await Ticket.findAll({
      where: {
        showtime_id: id,
        status: ["unused", "used", "expired"], // Không tính ghế đã hoàn tiền
      },
      attributes: ["seat_id", "user_id"],
    });

    const bookedSeatIds = bookedSeats.map((ticket) => ticket.seat_id);

    // Thêm trạng thái cho từng ghế
    const seatsWithStatus = allSeats.map((seat) => {
      const bookedTicket = bookedSeats.find(
        (ticket) => ticket.seat_id === seat.id
      );
      return {
        id: seat.id,
        seat_number: seat.seat_number,
        status: bookedSeatIds.includes(seat.id) ? "not empty" : "empty", // Trạng thái ghế
        user_id: bookedTicket ? bookedTicket.user_id : null,
      };
    });

    res.json({
      success: true,
      message: "Lấy danh sách ghế trống thành công",
      data: seatsWithStatus,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllShowtimes,
  createShowtime,
  updateShowtime,
  deleteShowtime,
  getSeats,
};
