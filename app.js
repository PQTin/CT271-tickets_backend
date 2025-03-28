const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorMiddleware = require("./app/middlewares/errorMiddleware");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Xử lý JSON request body
app.use(express.urlencoded({ extended: true })); // Xử lý form-data

// Routes
app.use("/api/users", require("./app/routes/userRoutes"));
app.use("/api/movies", require("./app/routes/movieRoutes"));
// Middleware xử lý lỗi
app.use(errorMiddleware);

module.exports = app;
