const User = require("../models/User");
const createError = require("../utils/error");

const createUser = async (req, res, next) => {
  try {
    res.send("createUser router");
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });

    if (!user) {
      throw new Error("User doesnt exist!");
    }

    await User.deleteOne({ _id: id });
    res.status(200).json({ msg: "user deleted succesfully!" });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "reservedRooms",
      select: "title roomNumbers",
      // match: { "roomNumbers.reservedBy": req.params.id },
    });

    if (!user) return next(createError(404, "User does not exists"));

    const filteredRoomNumbers = user.reservedRooms.map((room) => {
      room.roomNumbers = room.roomNumbers.filter(
        (roomNumber) => roomNumber.reservedBy?.toString() === req.params.id
      );
      return room;
    });

    user.reservedRooms = filteredRoomNumbers;

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate({
      path: "reservedRooms",
      select: `title roomNumbers `,
    });

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, updateUser, deleteUser, getUser, getAllUsers };
