const express = require("express");
const { verifyAdmin } = require("../utils/verify");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  updateRoomAvailability,
} = require("../controllers/roomController");
const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);

router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

router.get("/:id", getRoom);

router.get("/", getAllRooms);

module.exports = router;
