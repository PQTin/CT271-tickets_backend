const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorMiddleware = require("./app/middlewares/errorMiddleware");

dotenv.config();

const app = express();
const path = require("path");
// Cấu hình để truy cập ảnh từ frontend
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Middleware
app.use(cors());
app.use(express.json()); // Xử lý JSON request body
app.use(express.urlencoded({ extended: true })); // Xử lý form-data

// Routes
app.use("/api/users", require("./app/routes/userRoutes"));
app.use("/api/movies", require("./app/routes/movieRoutes"));
app.use("/api/rooms", require("./app/routes/roomSeatRoutes"));
app.use("/api/showtimes", require("./app/routes/showtimeRoutes"));
app.use("/api/tickets", require("./app/routes/ticketRoutes"));
// Middleware xử lý lỗi
app.use(errorMiddleware);

module.exports = app;
