const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require("../controllers/userController");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verify");

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user, you are logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and you can delete your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello admin, you are logged in and you can delete all accounts");
// });

// router.post("/", verifyUser, createUser);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getUser);
router.get("/", verifyAdmin, getAllUsers);

module.exports = router;
