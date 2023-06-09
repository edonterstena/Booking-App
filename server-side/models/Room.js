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
    reservedByUsers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: false,
      },
    ],
    hotel: {
      type: mongoose.Schema.ObjectId,
      ref: "Hotel",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    roomNumbers: [
      {
        number: Number,
        unavailableDates: { type: [Date] },
        reservedBy: { type: String },
      },
    ],
  },
  { timestamps: true }
);

roomSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const hotel = await this.model("Hotel").findOne({ rooms: this._id });
    const reserved = await this.model("User").findOne({
      reservedRooms: this._id,
    });

    if (hotel) {
      hotel.rooms.pull(this._id);
      await hotel.save();
    }

    if (reserved) {
      reserved.reservedRooms.pull(this._id);
      await reserved.save();
    }
  }
);

module.exports = mongoose.model("Room", roomSchema);
