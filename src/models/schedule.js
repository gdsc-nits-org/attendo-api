const mongoose = require("mongoose");

const scheduleModel = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    classes: {
      monday: [
        {
          time: String,
          faculty: String,
          subject: String,
        },
      ],
      tuesday: [
        {
          time: String,
          faculty: String,
          subject: String,
        },
      ],
      wednesday: [
        {
          time: String,
          faculty: String,
          subject: String,
        },
      ],
      thursday: [
        {
          time: String,
          faculty: String,
          subject: String,
        },
      ],
      friday: [
        {
          time: String,
          faculty: String,
          subject: String,
        },
      ],
      saturday: [
        {
          time: String,
          faculty: String,
          subject: String,
        },
      ],
      sunday: [
        {
          time: String,
          faculty: String,
          subject: String,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("schedule", scheduleModel);
