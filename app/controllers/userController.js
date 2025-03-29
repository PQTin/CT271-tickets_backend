const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Ticket } = require("../models");
const { Op } = require("sequelize");
const ApiError = require("../utils/apiError");
const path = require("path");
const fs = require("fs");

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
      avatar_url: "/uploads/avatars/default.png",
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
      avatar_url: "/uploads/avatars/default.png",
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
    const role = user.role;
    res.json({
      success: true,
      message: "Đăng nhập thành công",
      token,
      user,
      role,
    });
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

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id ? req.params.id : req.user.id;
    const { username, email, phone, password, role } = req.body;
    const isAdmin = req.user.role === "admin";

    const user = await User.findByPk(userId);
    if (!user) return next(new ApiError(404, "Người dùng không tồn tại."));

    // Nếu user thường gửi lên role => chặn lại
    if (!isAdmin && role) {
      return next(new ApiError(403, "Bạn không có quyền thay đổi quyền hạn."));
    }

    // Admin không thể tự đổi role của chính mình
    if (isAdmin && userId == req.user.id && role) {
      return next(
        new ApiError(403, "Admin không thể tự thay đổi role của mình.")
      );
    }

    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername)
        return next(new ApiError(400, "Username đã tồn tại."));
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) return next(new ApiError(400, "Email đã tồn tại."));
    }

    if (phone && phone !== user.phone) {
      const existingPhone = await User.findOne({ where: { phone } });
      if (existingPhone)
        return next(new ApiError(400, "Số điện thoại đã tồn tại."));
    }

    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    let avatarUrl = user.avatar_url;
    if (req.file) {
      if (avatarUrl && avatarUrl !== "/uploads/avatars/default.png") {
        const avatarPath = path.join(__dirname, "..", avatarUrl);
        if (fs.existsSync(avatarPath)) {
          fs.unlinkSync(avatarPath);
        }
      }
      avatarUrl = `/uploads/avatars/${req.file.filename}`;
    }
    // admin thay đổi role của người dùng.
    const updatedRole = isAdmin && role ? role : user.role;

    await user.update({
      username: username || user.username,
      email: email || user.email,
      phone: phone || user.phone,
      password: hashedPassword,
      avatar_url: avatarUrl,
      role: updatedRole,
    });

    res.json({ success: true, message: "Cập nhật thành công", user });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    //Tìm người dùng theo ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại!" });
    }

    //Kiểm tra xem người dùng có vé chưa sử dụng không
    const hasUnusedTicket = await Ticket.findOne({
      where: { user_id: id, status: "unused" },
    });

    if (hasUnusedTicket) {
      return res
        .status(400)
        .json({ message: "Không thể xóa! Người dùng còn vé chưa sử dụng." });
    }

    //Xóa tất cả vé liên quan đến người dùng
    await Ticket.destroy({ where: { user_id: id } });

    //Xóa ảnh đại diện nếu có
    if (user.avatar_url && user.avatar_url !== "/uploads/avatars/default.png") {
      const avatarPath = path.join(__dirname, "..", user.avatar_url);
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
    }

    //Xóa người dùng khỏi database
    await User.destroy({ where: { id } });

    return res
      .status(200)
      .json({ success: true, message: "Xóa người dùng thành công!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server!" });
  }
};
