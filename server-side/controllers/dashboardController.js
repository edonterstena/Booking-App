const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Subscribe = require("../models/Subscribe");
const User = require("../models/User");

const getDashboard = async (req, res, next) => {
  try {
    const totalHotels = await Hotel.countDocuments();
    const totalRooms = await Room.countDocuments();
    const totalSubscribers = await Subscribe.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      totalHotels: totalHotels,
      totalRooms: totalRooms,
      totalSubscribers: totalSubscribers,
      totalUsers: totalUsers,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getDashboard;
