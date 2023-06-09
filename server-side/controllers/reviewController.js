const Hotel = require("../models/Hotel");
const Review = require("../models/Review");
const createError = require("../utils/error");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verify");

const createReview = async (req, res, next) => {
  const { hotel: hotelId } = req.body;

  try {
    const isValidHotel = await Hotel.findOne({ _id: hotelId });
    if (!isValidHotel) {
      return next(createError(404, `No hotel with id : ${hotelId}`));
    }

    const alreadySubmitted = await Review.findOne({
      hotel: hotelId,
      user: req.user.id,
    });

    if (alreadySubmitted) {
      return next(createError(404, "Already submitted review for this hotel"));
    }

    req.body.user = req.user.id;
    const review = await Review.create(req.body);
    res.status(200).json({ review });
  } catch (err) {
    next(err);
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({})
      .populate({
        path: "hotel",
        select: "name city type",
      })
      .populate({
        path: "user",
        select: "img name lastname createdAt",
      });

    res.status(200).json({ reviews, count: reviews.length });
  } catch (err) {
    next(err);
  }
};

const getSingleReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(
        createError(404, `Review with id:${req.params.id} does not exists!`)
      );
    }
    res.status(200).json({ review });
  } catch (err) {
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const { rating, title, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(createError(404, "Review does not exists!"));
    }

    if (req.user.id !== review.user.toString()) {
      throw new Error("You are not authorized");
    } else {
      review.rating = rating;
      review.title = title;
      review.comment = comment;
    }

    await review.save(review);

    res.status(200).json({ review });
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(createError(404, "Review does not exists!"));
    }

    if (req.user.id !== review.user.toString()) {
      throw new Error("You are not authorized");
    }

    await review.deleteOne(review);
    res.status(200).json({ msg: "Review removed" });
  } catch (err) {
    next(err);
  }
};

const getSingleHotelReviews = async (req, res, next) => {
  const { id: hotelId } = req.params;
  try {
    const reviews = await Review.find({ hotel: hotelId }).populate({
      path: "user",
      select: "img name lastname createdAt",
    });
    res.status(200).json({ reviews, count: reviews.length });
  } catch (err) {
    next(err);
  }
};

const setReviewHelpful = async (req, res, next) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return next(createError(404, "Review does not exist!"));
    }

    const userId = req.user.id;

    // Check if the user has already marked the review as helpful
    const existingHelpfulReview = review.helpful.find((helpfulReview) =>
      helpfulReview.userId.equals(userId)
    );
    if (existingHelpfulReview) {
      return res
        .status(400)
        .json({ message: "Review already marked as helpful by the user" });
    }

    // Update the review to mark it as helpful, increment the count, and add the user to the helpful array
    review.helpful.push({ userId, markedAsHelpful: true });
    review.numOfHelpful += 1;
    await review.save();

    res.status(200).json({ review });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleHotelReviews,
  setReviewHelpful,
};
