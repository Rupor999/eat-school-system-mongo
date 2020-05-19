const mongoose = require("mongoose");

const kshpSchema = mongoose.Schema(
  {
    city: {
      type: String,
      required: true
    },
    kombinat: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

mongoose.model("Kshp", kshpSchema);
