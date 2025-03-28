const { Showtime, Movie, Room, Ticket } = require("../models");
const ApiError = require("../utils/apiError");

// Lấy tất cả suất chiếu
const getAllShowtimes = async (req, res, next) => {
  try {
    const showtimes = await Showtime.findAll({
      include: [
        { model: Movie, attributes: ["name", "genre", "duration"] },
        { model: Room, attributes: ["name"] },
      ],
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

    // Kiểm tra phim và phòng có tồn tại không
    const movie = await Movie.findByPk(movie_id);
    const room = await Room.findByPk(room_id);
    if (!movie || !room) {
      throw new ApiError(404, "Phim hoặc phòng không tồn tại");
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

    const showtime = await Showtime.findByPk(id);
    if (!showtime) {
      throw new ApiError(404, "Suất chiếu không tồn tại");
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

module.exports = {
  getAllShowtimes,
  createShowtime,
  updateShowtime,
  deleteShowtime,
};
