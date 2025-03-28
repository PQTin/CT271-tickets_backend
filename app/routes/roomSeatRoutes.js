const express = require("express");
const {
  getRooms,
  createRoom,
  deleteRoom,
} = require("../controllers/roomSeatController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.get("/", getRooms);
router.post("/create", verifyToken, isAdmin, createRoom);
router.delete("/delete/:id", verifyToken, isAdmin, deleteRoom);

module.exports = router;
