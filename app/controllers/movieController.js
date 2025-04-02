const { Movie, Showtime, Ticket, Room } = require("../models");
const ApiError = require("../utils/apiError");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
// Lấy danh sách tất cả phim
exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.findAll();
    res.json({
      success: true,
      message: "Lấy danh sách phim thành công",
      data: movies,
    });
  } catch (error) {
    next(new ApiError(500, "Lỗi khi lấy danh sách phim"));
  }
};
// Lấy thông tin phim theo id và kèm theo danh sách suất chiếu
exports.getMovieById = async (req, res, next) => {
  const { id } = req.params; // Lấy id phim từ tham số request

  try {
    const movie = await Movie.findOne({
      where: { id },
      include: [
        {
          model: Showtime,
          as: "Showtimes",
          required: false,
          include: [
            {
              model: Room,
              as: "Room",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    // Nếu không tìm thấy phim, trả về lỗi
    if (!movie) {
      return next(new ApiError(404, "Phim không tồn tại"));
    }

    res.json({
      success: true,
      message: "Lấy thông tin phim thành công",
      data: movie,
    });
  } catch (error) {
    next(new ApiError(500, "Lỗi khi lấy thông tin phim"));
  }
};

// Thêm phim mới
exports.createMovie = async (req, res, next) => {
  try {
    const { name, description, genre, duration, release_date, trailer_url } =
      req.body;
    if (!name || !genre || !duration || !release_date) {
      return next(new ApiError(400, "Vui lòng điền đầy đủ thông tin phim"));
    }

    const poster_url = req.file
      ? `/uploads/posters/${req.file.filename}`
      : null;

    const newMovie = await Movie.create({
      name,
      description,
      genre,
      duration,
      release_date,
      trailer_url,
      poster_url,
    });
    res.status(201).json({
      success: true,
      message: "Thêm phim mới thành công",
      data: newMovie,
    });
  } catch (error) {
    next(new ApiError(500, "Lỗi khi Thêm phim mới"));
  }
};

// Cập nhật phim theo ID
exports.updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, genre, duration, release_date, trailer_url } =
      req.body;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return next(new ApiError(404, "Không tìm thấy phim"));
    }

    // Nếu có ảnh mới, xóa ảnh cũ
    if (req.file && movie.poster_url) {
      const oldPath = path.join(__dirname, "..", movie.poster_url);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const poster_url = req.file
      ? `/uploads/posters/${req.file.filename}`
      : movie.poster_url;

    await movie.update({
      name,
      description,
      genre,
      duration,
      release_date,
      trailer_url,
      poster_url,
    });
    res.json({
      success: true,
      message: "Cập nhật phim thành công",
      data: movie,
    });
  } catch (error) {
    next(new ApiError(500, "Lỗi khi cập nhật phim"));
  }
};

// Xóa phim theo ID
exports.deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return next(new ApiError(404, "Không tìm thấy phim"));
    }
    // Kiểm tra xem phim có suất chiếu chưa kết thúc không
    const ongoingShowtime = await Showtime.findOne({
      where: {
        movie_id: id,
        end_time: { [Op.gt]: new Date() }, // Suất chiếu chưa kết thúc
      },
    });

    if (ongoingShowtime) {
      return next(new ApiError(400, "Phim đang có suất chiếu, không thể xóa"));
    }

    // Tìm tất cả suất chiếu liên quan
    const showtimes = await Showtime.findAll({ where: { movie_id: id } });
    for (const showtime of showtimes) {
      // Xóa tất cả vé của suất chiếu này trước
      await Ticket.destroy({ where: { showtime_id: showtime.id } });
      // Xóa suất chiếu
      await showtime.destroy();
    }

    // Xóa ảnh khỏi thư mục
    if (movie.poster_url) {
      const oldPath = path.join(__dirname, "..", movie.poster_url);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    await movie.destroy();
    res.json({ success: true, message: "Xóa phim thành công" });
  } catch (error) {
    next(new ApiError(500, "Lỗi khi xóa phim"));
  }
};
