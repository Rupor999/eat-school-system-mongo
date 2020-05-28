const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    from: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      required: true,
    },
    to: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

mongoose.model("Chat", chatSchema);
