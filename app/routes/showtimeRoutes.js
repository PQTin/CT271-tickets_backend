const express = require("express");
const {
  getAllShowtimes,
  createShowtime,
  updateShowtime,
  deleteShowtime,
} = require("../controllers/showtimeController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.get("/", getAllShowtimes);
router.post("/create", verifyToken, isAdmin, createShowtime);
router.put("/update/:id", verifyToken, isAdmin, updateShowtime);
router.delete("/delete/:id", verifyToken, isAdmin, deleteShowtime);

module.exports = router;
