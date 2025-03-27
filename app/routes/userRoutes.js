const express = require("express");
const {
  register,
  login,
  getCurrentUser,
  getUsersByRole,
  adminRegister,
} = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddlewares");

const router = express.Router();

// Đăng ký (yêu cầu token nếu tạo admin)
router.post("/adminRegister", verifyToken, adminRegister);

router.post("/register", register);
// Đăng nhập
router.post("/login", login);

// Lấy thông tin người dùng hiện tại (yêu cầu xác thực)
router.get("/me", verifyToken, getCurrentUser);

// Lấy danh sách người dùng theo role (chỉ Admin mới xem được)
router.get("/role/:role", verifyToken, isAdmin, getUsersByRole);

module.exports = router;
