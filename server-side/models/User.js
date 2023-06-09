const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    reservedRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  },
  { timestamps: true }
);

userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const roomReserved = await this.model("Room").findOne({
      reservedByUsers: this._id,
    });
    const roomNumbersReserved = await this.model("Room").findOne({
      "roomNumbers.reservedBy": this._id,
    });

    if (roomReserved) {
      roomReserved.reservedByUsers.pull(this._id);
      await roomReserved.save();
    }

    if (roomNumbersReserved) {
      roomNumbersReserved.roomNumbers.forEach((roomNumber) => {
        if (
          roomNumber.reservedBy &&
          roomNumber.reservedBy.toString() === this._id.toString()
        ) {
          roomNumber.unavailableDates = [];
          roomNumber.reservedBy = null;
        }
      });
      await roomNumbersReserved.save();
    }
  }
);

module.exports = mongoose.model("User", userSchema);
