require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const Utils = require("./src/utils");
const Routers = require("./src/routers");
const Middlewares = require("./src/middlewares");

const app = express();

Utils.Firebase.initializeAdmin();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// App Health Check
app.get("/", (_, res) => {
  return res.json(Utils.Response.success("Attendo API"));
});

// Routers
app.use("/class", Routers.Class);
app.use("/notice", Routers.Notice);
app.use("/reminder", Routers.Reminder);
app.use("/schedule", Routers.Schedule);
app.use("/users", Routers.Users);

// Mongoose
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_URI,
  { serverSelectionTimeoutMS: 5000 },
  (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log("DB Connected");
    }
  }
);

// Error Handlers
app.use(Middlewares.Error.errorLogger);
app.use(Middlewares.Error.errorHandler);

module.exports = app;
