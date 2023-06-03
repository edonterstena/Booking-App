const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    description: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      defaul: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rooms: {
      type: [String],
    },
    cheapestPrice: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

hotelSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "hotel",
  justOne: false,
  // match: { rating: 5 },
});

hotelSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await this.model("Review").deleteMany({ hotel: this._id });
  }
);

module.exports = mongoose.model("Hotel", hotelSchema);
