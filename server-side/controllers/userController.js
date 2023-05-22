const createUser = async (req, res, next) => {
  try {
    res.send("createUser router");
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, updateUser, deleteUser, getUser, getAllUsers };
