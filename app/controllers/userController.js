const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Op } = require("sequelize");
const ApiError = require("../utils/apiError");

env = process.env;

// Đăng ký
exports.adminRegister = async (req, res, next) => {
  try {
    const { username, email, phone, password, role } = req.body;

    // Kiểm tra username đã tồn tại chưa
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername)
      return next(new ApiError(400, "Username đã tồn tại."));

    // Kiểm tra email đã tồn tại chưa
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) return next(new ApiError(400, "Email đã tồn tại."));

    // Kiểm tra phone đã tồn tại chưa
    const existingPhone = await User.findOne({ where: { phone } });
    if (existingPhone)
      return next(new ApiError(400, "Số điện thoại đã tồn tại."));

    // Mặc định role là "client"
    let newRole = "client";

    // Nếu yêu cầu tạo tài khoản admin
    if (role === "admin") {
      if (!req.user || req.user.role !== "admin") {
        return next(
          new ApiError(403, "Bạn không có quyền tạo tài khoản admin.")
        );
      }
      newRole = role;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      role: newRole,
    });

    res
      .status(201)
      .json({ success: true, message: "Đăng ký thành công", user: newUser });
  } catch (error) {
    next(error);
  }
};

// Người dùng tự đăng ký (mặc định role = client)
exports.register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;

    // Kiểm tra username đã tồn tại chưa
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return next(new ApiError(400, "Username đã tồn tại."));

    // Kiểm tra email đã tồn tại chưa
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) return next(new ApiError(400, "Email đã tồn tại."));

    // Kiểm tra phone đã tồn tại chưa
    const existingPhone = await User.findOne({ where: { phone } });
    if (existingPhone)
      return next(new ApiError(400, "Số điện thoại đã tồn tại."));

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      role: "client", // Mặc định role là client
    });

    res
      .status(201)
      .json({ success: true, message: "Đăng ký thành công", user: newUser });
  } catch (error) {
    next(error);
  }
};

// Đăng nhập
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return next(new ApiError(401, "Tài khoản không tồn tại."));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ApiError(401, "Mật khẩu không đúng."));

    const token = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ success: true, message: "Đăng nhập thành công", token, user });
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin người dùng hiện tại
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return next(new ApiError(404, "Người dùng không tồn tại."));
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách người dùng theo role
exports.getUsersByRole = async (req, res, next) => {
  try {
    const { role } = req.params;
    if (!["admin", "client"].includes(role))
      return next(new ApiError(400, "Role không hợp lệ."));

    const users = await User.findAll({
      where: { role },
      attributes: { exclude: ["password"] },
    });
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
};
