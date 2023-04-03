const Models = require("../models");
const Utils = require("../utils");
const Middlewares = require("../middlewares");

const setReminder = Middlewares.CatchAsync(async (req, res, next) => {
  const { label, time, token } = req.body;
  if (
    !label ||
    typeof label !== "string" ||
    !time ||
    !token ||
    typeof token !== "string"
  ) {
    return next(Utils.Response.error("Invalid field types !", 400));
  }

  const reminder = await Models.Reminder.create({
    label,
    reminderScheduledAt: time,
    token,
  });

  Utils.Notification.sendReminder([token], label, "true", time);

  return res.json(Utils.Response.success(reminder));
});

module.exports = { setReminder };
