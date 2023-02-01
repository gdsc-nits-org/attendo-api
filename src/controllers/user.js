const Models = require("../models");
const Utils = require("../utils");

async function getAllUsersFromClass(req, res) {
  const { classId } = req.params;

  const users = await Models.User.find({ class: classId }).sort({
    scholarId: 1,
  });
  return res.json(Utils.Response.success(users));
}

async function updateInfo(req, res) {
  const { email } = req.params;

  //! Too much trust in frontend to add req.body
  const student = await Models.User.findOneAndUpdate(
    { email: email },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  return res.json(Utils.Response.success(student));
}

async function fcmUpdate(req, res, next) {
  const { email, fcmToken } = req.body;
  if (
    !email ||
    typeof email !== "string" ||
    !fcmToken ||
    typeof fcmToken !== "string"
  ) {
    return next(Utils.Response.error("Type Error", 400));
  }

  const user = await Models.User.findOne({ email: email });
  if (!user) {
    return next(
      Utils.Response.error("User has not yet joined or created any class", 400)
    );
  }

  user.fcmToken = fcmToken;
  await user.save();

  return res.json(Utils.Response.success(user));
}

async function getFcmToken(req, res, next) {
  const { email } = req.params;
  if (!email || typeof email !== "string") {
    return next(Utils.Response.error("Type Error", 400));
  }
  const user = await Models.User.findOne({ email: email });
  if (!user) {
    return next(Utils.Response.error("No user found", 400));
  }

  return res.json(Utils.Response.success(user.fcmToken));
}

module.exports = { getAllUsersFromClass, updateInfo, fcmUpdate, getFcmToken };
