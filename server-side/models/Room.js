const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reservedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
