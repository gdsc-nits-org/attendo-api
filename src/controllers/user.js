const Models = require("../models");
const Utils = require("../utils");
const Middlewares = require("../middlewares");

const getAllUsersFromClass = Middlewares.CatchAsync(async (req, res, next) => {
  const { classId } = req.params;

  const users = await Models.User.find({ class: classId }).sort({
    scholarId: 1,
  });

  if (users.length === 0) {
    return next(Utils.Response.error("No students found in the class !", 400));
  }

  return res.json(Utils.Response.success(users));
});

const updateInfo = Middlewares.CatchAsync(async (req, res, next) => {
  const { email } = req.params;

  const { name, newEmail, scholarId, isCr, fcmToken } = req.body;

  if (
    (name && typeof name !== "string") ||
    (newEmail && typeof newEmail !== "string") ||
    (scholarId && typeof scholarId !== "string") ||
    (isCr && typeof isCr !== "boolean") ||
    (fcmToken && typeof fcmToken !== "string")
  ) {
    return next(Utils.Response.error("Invalid field types !", 400));
  }

  const student = await Models.User.findOneAndUpdate(
    { email: email },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (student === null) {
    return next(
      Utils.Response.error("No student found with the email id !", 400)
    );
  }

  return res.json(Utils.Response.success(student));
});

const fcmUpdate = Middlewares.CatchAsync(async (req, res, next) => {
  const { email, fcmToken } = req.body;
  if (
    !email ||
    typeof email !== "string" ||
    !fcmToken ||
    typeof fcmToken !== "string"
  ) {
    return next(Utils.Response.error("Invalid field types !", 400));
  }

  const user = await Models.User.findOne({ email: email });
  if (!user) {
    return next(
      Utils.Response.error(
        "User has not yet joined or created any class !",
        400
      )
    );
  }

  user.fcmToken = fcmToken;
  await user.save();

  return res.json(Utils.Response.success(user));
});

const getFcmToken = Middlewares.CatchAsync(async (req, res, next) => {
  const { email } = req.params;

  const user = await Models.User.findOne({ email: email });
  if (!user) {
    return next(Utils.Response.error("No user found !", 400));
  }

  return res.json(Utils.Response.success(user.fcmToken));
});

module.exports = { getAllUsersFromClass, updateInfo, fcmUpdate, getFcmToken };
