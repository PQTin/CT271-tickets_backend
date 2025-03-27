const jwt = require("jsonwebtoken");
const { User } = require("../models");
const ApiError = require("../utils/apiError");

env = process.env;

// Middleware xác thực token
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return next(new ApiError(401, "Không có token, truy cập bị từ chối."));

    const decoded = jwt.verify(token.replace("Bearer ", ""), env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(401, "Token không hợp lệ hoặc đã hết hạn."));
  }
};

// Middleware kiểm tra quyền Admin
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user || user.role !== "admin") {
      return next(new ApiError(403, "Bạn không có quyền truy cập."));
    }
    next();
  } catch (error) {
    next(error);
  }
};
