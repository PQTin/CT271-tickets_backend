const express = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddlewares");

const router = express.Router();

// Lấy danh sách phim (ai cũng có thể lấy)
router.get("/", getAllMovies);

// Thêm phim (chỉ Admin mới có quyền)
router.post("/create", verifyToken, isAdmin, createMovie);

// Cập nhật phim (chỉ Admin mới có quyền)
router.put("/update/:id", verifyToken, isAdmin, updateMovie);

// Xóa phim (chỉ Admin mới có quyền)
router.delete("/delete/:id", verifyToken, isAdmin, deleteMovie);

module.exports = router;
