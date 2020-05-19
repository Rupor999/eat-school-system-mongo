const mongoose = require("mongoose");

const schoolSchema = mongoose.Schema(
  {
    school_name: {
      type: String,
      required: true
    },
    id_kshp: {
      type: String,
      required: true
    },
    id_city: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

mongoose.model("School", schoolSchema);
