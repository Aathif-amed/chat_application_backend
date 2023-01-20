const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    message: {
      type: String,
    },
    timestamp: {
      type: String,
    },
    uid: {
      type: String,
    },
    roomId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("messages", messageSchema);
