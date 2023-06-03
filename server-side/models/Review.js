const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      requred: [true, "Please provide rating"],
    },
    title: {
      type: String,
      trim: true,
      requred: [true, "Please provide review title"],
      maxLength: 100,
    },
    comment: {
      type: String,
      requred: [true, "Please provide review text"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    hotel: {
      type: mongoose.Schema.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ hotel: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (hotelId) {
  const result = await this.aggregate([
    {
      $match: { hotel: hotelId },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);
  console.log(result);
  try {
    await this.model("Hotel").findOneAndUpdate(
      { _id: hotelId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.hotel);
});

ReviewSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await this.constructor.calculateAverageRating(this.hotel);
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
