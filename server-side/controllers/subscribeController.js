const Subscribe = require("../models/Subscribe");
const createError = require("../utils/error");

const createSubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    const subscriber = await Subscribe.create({ email });

    res.status(200).json(subscriber);
  } catch (err) {
    next(err);
  }
};

const getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Subscribe.find();
    res.status(200).json(subscribers);
  } catch (err) {
    next(err);
  }
};

const getSubscriberById = async (req, res, next) => {
  try {
    const subscriber = await Subscribe.findById(req.params.id);

    if (!subscriber) {
      return next(
        createError(404, `Subsriber with id: ${req.params.id} doesnt exists!`)
      );
    }

    res.status(200).json(subscriber);
  } catch (err) {
    next(err);
  }
};

const deleteSubscriberByid = async (req, res, next) => {
  try {
    const subcriber = await Subscribe.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Subscriber removed" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSubscribe,
  getSubscriberById,
  getSubscribers,
  deleteSubscriberByid,
};
