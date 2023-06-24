const mongoose = require("mongoose");
const Room = require("./Room");
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
    checkoutTotal: {
      type: Number,
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

// userSchema.pre(
//   "deleteOne",
//   { document: true, query: false },
//   async function (next) {
//     const roomReserved = await this.model("Room").findOne({
//       reservedByUsers: this._id,
//     });
//     const roomNumbersReserved = await this.model("Room").findOne({
//       "roomNumbers.reservedBy": this._id,
//     });

//     if (roomReserved) {
//       roomReserved.reservedByUsers.pull(this._id);
//       await roomReserved.save();
//     }

//     if (roomNumbersReserved) {
//       roomNumbersReserved.roomNumbers.forEach((roomNumber) => {
//         if (
//           roomNumber.reservedBy &&
//           roomNumber.reservedBy.toString() === this._id.toString()
//         ) {
//           roomNumber.unavailableDates = [];
//           roomNumber.reservedBy = null;
//         }
//       });
//       await roomNumbersReserved.save();
//     }
//   }
// );

// ... User schema definition ...

userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const roomsReserved = await Room.find({
        _id: { $in: this.reservedRooms },
      }).populate("roomNumbers.reservedBy");

      for (const room of roomsReserved) {
        room.reservedByUsers.pull(this._id);

        for (const roomNumber of room.roomNumbers) {
          if (
            roomNumber.reservedBy &&
            roomNumber.reservedBy._id.toString() === this._id.toString()
          ) {
            roomNumber.reservedBy = null;
            roomNumber.unavailableDates = [];
          }
        }

        room.markModified("roomNumbers"); // Mark the field as modified
        await room.save();
      }
    } catch (err) {
      console.error("Error updating related rooms:", err);
    }

    next();
  }
);

module.exports = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
