const Models = require("../models");
const Utils = require("../utils");

async function setReminder(req, res, next) {
  const { label, time, token } = req.body;
  if (
    !label ||
    typeof label !== "string" ||
    !time ||
    !token ||
    typeof token !== "string"
  ) {
    return next(Utils.Response.error("Type Error", 400));
  }

  const reminder = await Models.Reminder.create({
    label,
    reminderScheduledAt: time,
    token,
  });

  Utils.Notification.sendReminder([token], label, "true", time);

  return res.json(Utils.Response.success(reminder));
}

module.exports = { setReminder };
