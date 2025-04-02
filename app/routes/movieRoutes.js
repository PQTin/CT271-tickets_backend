const express = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
} = require("../controllers/movieController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddlewares");
const { uploadPoster } = require("../middlewares/upload");
const router = express.Router();

// Lấy danh sách phim (ai cũng có thể lấy)
router.get("/", getAllMovies);

router.get("/detail/:id", getMovieById);

// Thêm phim (chỉ Admin mới có quyền)
router.post("/create", verifyToken, isAdmin, uploadPoster, createMovie);

// Cập nhật phim (chỉ Admin mới có quyền)
router.put("/update/:id", verifyToken, isAdmin, uploadPoster, updateMovie);

// Xóa phim (chỉ Admin mới có quyền)
router.delete("/delete/:id", verifyToken, isAdmin, deleteMovie);

module.exports = router;
