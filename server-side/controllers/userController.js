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
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted succesfully!" });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "reservedRooms",
      select: "title",
    });
    if (!user) return next(createError(404, "User does not exists"));
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate({
      path: "reservedRooms",
      select: "title",
    });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, updateUser, deleteUser, getUser, getAllUsers };
