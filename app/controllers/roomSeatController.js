const { Room, Seat, Showtime, Ticket } = require("../models");
const { Op } = require("sequelize");
const ApiError = require("../utils/apiError");

const roomController = {
  // Lấy danh sách phòng
  getRooms: async (req, res, next) => {
    try {
      const rooms = await Room.findAll();

      if (!rooms || rooms.length === 0) {
        return next(new ApiError(404, "Không có phòng nào"));
      }

      res.json({ success: true, data: rooms });
    } catch (error) {
      next(error);
    }
  },

  // Thêm phòng
  createRoom: async (req, res, next) => {
    try {
      const { name, total_seats } = req.body;
      if (!name || !total_seats) {
        return next(
          new ApiError(400, "Tên phòng và số ghế không được để trống")
        );
      }
      const existingRoom = await Room.findOne({ where: { name } });
      if (existingRoom) {
        return next(
          new ApiError(400, "Tên phòng đã tồn tại, vui lòng chọn tên khác")
        );
      }

      const room = await Room.create({ name, total_seats });
      const seats = [];
      for (let i = 1; i <= total_seats; i++) {
        seats.push({ room_id: room.id, seat_number: `${name}${i}` });
      }
      await Seat.bulkCreate(seats);

      res
        .status(201)
        .json({ success: true, message: "Tạo phòng thành công", room });
    } catch (error) {
      next(error);
    }
  },

  // Xóa phòng
  deleteRoom: async (req, res, next) => {
    try {
      const { id } = req.params;
      const room = await Room.findByPk(id);
      if (!room) {
        return next(new ApiError(404, "Phòng không tồn tại"));
      }

      // Kiểm tra nếu có suất chiếu chưa kết thúc
      const activeShowtimes = await Showtime.findOne({
        where: { room_id: id, end_time: { [Op.gt]: new Date() } },
      });

      if (activeShowtimes) {
        return next(
          new ApiError(
            400,
            "Phòng đang có suất chiếu chưa kết thúc, không thể xóa"
          )
        );
      }

      // Lấy tất cả suất chiếu của phòng
      const showtimeIds = await Showtime.findAll({
        where: { room_id: id },
        attributes: ["id"],
      }).then((showtimes) => showtimes.map((s) => s.id));

      if (showtimeIds.length > 0) {
        // Xóa vé trước khi xóa suất chiếu
        await Ticket.destroy({ where: { showtime_id: showtimeIds } });

        // Xóa suất chiếu
        await Showtime.destroy({ where: { room_id: id } });
      }

      // Xóa ghế
      await Seat.destroy({ where: { room_id: id } });

      // Xóa phòng
      await room.destroy();

      res.json({ success: true, message: "Xóa phòng thành công" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = roomController;
