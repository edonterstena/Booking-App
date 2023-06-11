const express = require("express");
const {
  createSubscribe,
  getSubscriberById,
  getSubscribers,
  deleteSubscriberByid,
} = require("../controllers/subscribeController");

const router = express.Router();

router.post("/", createSubscribe);
router.get("/", getSubscribers);
router.get("/:id", getSubscriberById);
router.delete("/:id", deleteSubscriberByid);

module.exports = router;
