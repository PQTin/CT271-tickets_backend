const express = require("express");
const {
  getUserTickets,
  getAllTickets,
  cancelTicket,
  deleteTicket,
  bookTicket,
  updateTicketStatus,
} = require("../controllers/ticketController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.get("/", verifyToken, isAdmin, getAllTickets);
router.get("/user", verifyToken, getUserTickets);
router.post("/book", verifyToken, bookTicket);
router.put("/cancel/:id", verifyToken, cancelTicket);
router.delete("/delete/:id", verifyToken, deleteTicket);
router.put("/update/:id", verifyToken, isAdmin, updateTicketStatus);

module.exports = router;
