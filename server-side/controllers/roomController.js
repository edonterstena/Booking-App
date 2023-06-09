const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const User = require("../models/User");

// const createRoom = async (req, res, next) => {
//   // const hotelId = req.params.hotelid;
//   req.body.createdBy = req.user.id;
//   const newRoom = new Room(req.body);

//   try {
//     const savedRoom = await Room.create(newRoom);
//     // try {
//     //   await Hotel.findByIdAndUpdate(hotelId, {
//     //     $push: { rooms: savedRoom._id },
//     //   });
//     // } catch (err) {
//     //   next(err);
//     // }
//     res.status(200).json(savedRoom);
//   } catch (err) {
//     next(err);
//   }
// };

async function createRoom(req, res) {
  try {
    const { title, price, maxPeople, description, roomNumbers } = req.body;

    // Create a new room instance
    const room = new Room({
      title,
      price,
      maxPeople,
      description,
      roomNumbers,
      createdBy: req.user.id, // Assuming the authenticated user is creating the room
    });

    // Save the room to the database
    await room.save();

    res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the room" });
  }
}

// const updateRoom = async (req, res, next) => {
//   try {
//     const updatedRoom = await Room.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );

//     res.status(200).json(updatedRoom);
//   } catch (err) {
//     next(err);
//   }
// };

const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      throw new Error("Room doesn't exists!");
    }

    await Room.deleteOne({ _id: room });

    res.status(200).json({ msg: "Room deleted succesfully!" });
  } catch (err) {
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate({
        path: "createdBy",
        select: "name lastname",
      })
      .populate({
        path: "reservedByUsers",
        select: "name lastname",
      })
      .populate({
        path: "hotel",
        select: "_id title",
      });
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find()
      .populate({
        path: "createdBy",
        select: "name lastname",
      })
      .populate({
        path: "reservedByUsers",
        select: "name lastname",
      })
      .populate({ path: "hotel", select: "_id title" });
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

// const updateRoomAvailability = async (req, res, next) => {
//   req.body.reservedBy = req.user.id;

//   // const { roomNumberId: roomNumberId } = req.params;

//   try {
//     const room = await Room.findById(req.params.id);
//     if (!room) {
//       return res.status(404).json("Room not found!");
//     }

//     const user = await User.findById(req.user.id);
//     user.reservedRooms.push(room);
//     await user.save();

//     await Room.updateOne(
//       { "roomNumbers._id": req.body.roomNumberIds },
//       {
//         $push: {
//           "roomNumbers.$.unavailableDates": req.body.dates,
//         },
//         reservedBy: req.body.reservedBy,
//       }
//     );

//     res.status(200).json("Room status has been updated.");
//   } catch (err) {
//     next(err);
//   }
// };

const updateRoomAvailability = async (req, res, next) => {
  req.body.reservedByUsers = req.user.id;
  req.body.reservedBy = req.user.id;

  try {
    // const room = await Room.findById(req.params.id);
    // if (!room) {
    //   return res.status(404).json("Room not found!");
    // }
    const roomIds = [];

    for (const roomId of req.body.roomIds) {
      roomIds.push(roomId);
    }
    // console.log(roomIds);

    const user = await User.findById(req.user.id);
    for (const rmId of roomIds) {
      user.reservedRooms.push(rmId);
    }

    await user.save();

    const roomNumberIds = req.body.roomNumberIds;
    const dates = req.body.dates;

    await Room.updateMany(
      {
        _id: { $in: roomIds },
        "roomNumbers._id": { $in: roomNumberIds },
      },
      {
        $push: {
          "roomNumbers.$.unavailableDates": { $each: dates },
          // "roomNumbers.$.reservedBy": req.body.reservedBy,
          // reservedByUsers: req.body.reservedByUsers,
        },
        $set: {
          "roomNumbers.$.reservedBy": req.body.reservedBy,
        },
        $addToSet: {
          reservedByUsers: req.body.reservedByUsers,
        },
      },
      { arrayFilters: [{ "roomNumbers._id": { $in: roomNumberIds } }] }
    );

    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

// const removeRoomReservedByUser = async (req, res, next) => {
//   const { roomId: roomId } = req.params;
//   const { roomNumberId: roomNumberId } = req.params;
//   try {
//     const room = await Room.findById(roomId);

//     if (!room) {
//       throw new Error("Room doesn't exists!");
//     }

//     const user = await User.findById(req.user.id);
//     if (!user) {
//       throw new Error("User doesn't exist!");
//     }

//     user.reservedRooms.pull(roomId);
//     await Room.updateOne(
//       { "roomNumbers._id": roomNumberId },
//       {
//         $set: {
//           "roomNumbers.$.unavailableDates": [],
//         },
//       }
//     );
//     await user.save();

//     res.status(200).json({ msg: "room removed from user's reservedRooms" });
//   } catch (err) {
//     next(err);
//   }
// };

const removeRoomReservedByUser = async (req, res, next) => {
  // const { roomId, roomNumberId } = req.params;
  const { roomId } = req.params;
  console.log(roomId);

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      throw new Error("Room doesn't exist!");
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      throw new Error("User doesn't exist!");
    }

    user.reservedRooms.pull(roomId);

    // Find the index of the reservedBy entry for the current user in the room's reservedBy array
    const userIndex = room.reservedByUsers.findIndex(
      (reservedUser) => reservedUser._id.toString() === req.user.id
    );

    if (userIndex === -1) {
      throw new Error("User hasn't reserved this room!");
    }

    // Remove the reservedBy entry for the current user from the room's reservedBy array
    room.reservedByUsers.splice(userIndex, 1);

    // Reset the unavailableDates for the specified roomNumberId to an empty array
    room.roomNumbers[userIndex].unavailableDates = [];

    // Reset the unavailableDates for all roomNumbers reserved by the current user to an empty array and set reservedBy to null
    room.roomNumbers.forEach((number) => {
      if (number.reservedBy && number.reservedBy.toString() === req.user.id) {
        number.unavailableDates = [];
        number.reservedBy = null;
      }
    });

    await Promise.all([room.save(), user.save()]);

    res.status(200).json({ msg: "Room removed from user's reservedRooms" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  updateRoomAvailability,
  removeRoomReservedByUser,
};
