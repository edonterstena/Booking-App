const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const reviewsRoute = require("./routes/reviews");
const dashboardRoute = require("./routes/dashboard");
const users = require("./routes/users");
const subscribersRoute = require("./routes/subscribe");
const contactRoute = require("./routes/contact");
const { verifyToken, verifyUser, verifyAdmin } = require("./utils/verify");

const app = express();
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to db");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDb disconnected");
});

//middlewares

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/hotels", hotelsRoute);
app.use("/api/v1/reviews", reviewsRoute);
app.use("/api/v1/rooms", roomsRoute);
app.use("/api/v1/users", users);
app.use("/api/v1/subscribers", subscribersRoute);
app.use("/api/v1/send-email", contactRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, async () => {
  await connectDb();
  console.log("connected to backend and listening to server 8800.");
});
