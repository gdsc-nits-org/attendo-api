const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    uuid: String,
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    scholarId: String,
    isCr: {
      type: Boolean,
      default: false,
    },
    fcmToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
