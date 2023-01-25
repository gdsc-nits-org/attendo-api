const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: String,
  code: String,
  cr: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
  },
});

module.exports = mongoose.model("class", classSchema);
