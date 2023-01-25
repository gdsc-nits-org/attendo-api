const Models = require("../models");
const Utils = require("../utils");

async function setReminder(req, res) {
  const { label, time, token } = req.body;

  const reminder = await Models.Reminder.create({
    label,
    reminderScheduledAt: time,
    token,
  });

  Utils.Notification.sendReminder([token], label, "true", time);

  return res.json(Utils.Response.success(reminder));
}

module.exports = { setReminder };
