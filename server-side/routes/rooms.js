const express = require("express");
const { verifyAdmin, verifyUser } = require("../utils/verify");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  updateRoomAvailability,
  removeRoomReservedByUser,
} = require("../controllers/roomController");
const router = express.Router();

router.post("/", verifyAdmin, createRoom);

router.put("/availability", verifyUser, updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);

router.delete("/:id", verifyAdmin, deleteRoom);

router.get("/:id", getRoom);

router.get("/", getAllRooms);

router.put("/removeReservedRoom/:roomId", verifyUser, removeRoomReservedByUser);

module.exports = router;
