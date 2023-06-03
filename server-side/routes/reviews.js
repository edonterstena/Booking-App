const express = require("express");
const router = express.Router();
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verify");

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", verifyUser, createReview);
router.get("/", getAllReviews);
router.get("/:id", getSingleReview);
router.put("/:id", verifyUser, updateReview);
router.delete("/:id", verifyUser, deleteReview);

module.exports = router;
