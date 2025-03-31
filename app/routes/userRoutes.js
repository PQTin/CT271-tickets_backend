const express = require("express");
const {
  register,
  login,
  getCurrentUser,
  getUsersByRole,
  adminRegister,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddlewares");
const { uploadAvatar } = require("../middlewares/upload");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getCurrentUser);
router.put("/update", verifyToken, uploadAvatar, updateUser);

router.post(
  "/adminRegister",
  verifyToken,
  isAdmin,
  uploadAvatar,
  adminRegister
);
router.get("/role/:role", verifyToken, isAdmin, getUsersByRole);
router.put("/update/:id", verifyToken, isAdmin, uploadAvatar, updateUser);
router.delete("/delete/:id", verifyToken, isAdmin, deleteUser);

module.exports = router;
