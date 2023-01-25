const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notice", noticeSchema);
