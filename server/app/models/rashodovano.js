const mongoose = require("mongoose");

const rashodovanoSchema = mongoose.Schema(
  {
    id_uchenik: {
      type: String,
      required: true,
    },
    vid_pitania: {
      type: String,
      required: true,
    },
    data_spisania: {
      type: Date,
      required: true,
      default: Date.now,
    },
    id_bufet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bufet",
      required: true,
    },
  },
  { versionKey: false }
);

mongoose.model("Rashodovano", rashodovanoSchema);
