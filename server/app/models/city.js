const mongoose = require("mongoose");

const citySchema = mongoose.Schema(
  {
    region: {
      type: Number,
      required: true
    },
    city_name: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

mongoose.model("City", citySchema);
