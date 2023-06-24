const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

// Controller function for creating a new hotel
async function createHotel(req, res) {
  try {
    const {
      name,
      type,
      city,
      address,
      title,
      distance,
      photos,
      description,
      cheapestPrice,
      featured,
      rooms,
    } = req.body;

    // Create a new hotel instance
    const hotel = new Hotel({
      name,
      type,
      city,
      address,
      title,
      distance,
      photos,
      description,
      cheapestPrice,
      featured,
      user: req.user.id, // Assuming the authenticated user is creating the hotel
    });

    // Save the hotel to the database
    await hotel.save();

    // Associate rooms with the hotel
    const associatedRooms = [];

    for (const roomId of rooms) {
      const room = await Room.findById(roomId);

      if (room) {
        room.hotel = hotel._id;
        await room.save();
        associatedRooms.push(room);
      }
    }

    // Update the hotel's rooms property with the associated room instances
    hotel.rooms = associatedRooms.map((room) => room._id);

    // Save the updated hotel to the database
    await hotel.save();

    res.status(201).json({
      message: "Hotel created successfully",
      hotel,
    });
  } catch (error) {
    console.error("Error creating hotel:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the hotel" });
  }
}

const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    const { id: hotelId } = req.params;

    const hotel = await Hotel.findOne({ _id: hotelId });

    if (!hotel) {
      throw new Error(`No Hotel with with id:${req.params.id}`);
    }

    await hotel.deleteOne();
    res.status(200).json({ msg: "Success! Hotel removed." });
  } catch (err) {
    next(err);
  }
};

const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
      .populate("reviews")
      .populate({
        path: "rooms",
        populate: {
          path: "reservedByUsers",
          select: "name lastname",
        },
      });

    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

const getAllHotels = async (req, res, next) => {
  const { destination, min, max, types } = req.query;

  // Build the query parameters based on the provided values
  const query = {};
  if (destination) {
    query.city = destination;
  }
  if (min || max) {
    query.cheapestPrice = {
      $gte: min || 1,
      $lte: max || 999,
    };
  }
  if (types) {
    query.type = { $in: types.split(",") };
  }

  try {
    const hotels = await Hotel.find(query)
      .limit(req.query.limit)
      .populate("rooms");
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// const countByCity = async (req, res, next) => {
//   const cities = req.query.cities.split(",");
//   try {
//     const list = await Promise.all(
//       cities.map(async (city) => {
//         const count = await Hotel.countDocuments({ city: city });
//         return { city, count };
//       })
//     );
//     res.status(200).json(list);
//   } catch (err) {
//     next(err);
//   }
// };

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map(async (city) => {
        const count = await Hotel.countDocuments({ city: city });
        return { city, count };
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

const hotelCities = async (req, res, next) => {
  try {
    const hotelCities = await Hotel.find({}, { city: 1, _id: 0 });
    res.status(200).json(hotelCities);
  } catch (err) {
    next(err);
  }
};

const countByType = async (req, res, next) => {
  const hotelCount = await Hotel.countDocuments({ type: "hotel" });
  const apartmentCount = await Hotel.countDocuments({ type: "apartment" });

  const villaCount = await Hotel.countDocuments({ type: "villa" });

  const houseCount = await Hotel.countDocuments({ type: "house" });

  res.status(200).json([
    { type: "hotel", count: hotelCount },
    { type: "apartment", count: apartmentCount },

    { type: "villa", count: villaCount },

    { type: "house", count: houseCount },
  ]);
};

const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
  countByCity,
  countByType,
  getHotelRooms,
  hotelCities,
};
