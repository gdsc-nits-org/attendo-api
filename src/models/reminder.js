const mongoose = require("mongoose");
const reminderSchema = new mongoose.Schema(
  {
    token: String,
    reminderScheduledAt: Date,
    label: String,
    state: {
      type: Boolean,
      default: true,
    },
    scheduledTaskName: String,
  },
  { timestamps: true }
);

const Reminder = mongoose.model("reminder", reminderSchema);
module.exports = Reminder;
