const mongoose = require("mongoose");

const bufetSchema = mongoose.Schema(
  {
    id_uchrezhdenia: {
      type: String,
      required: true
    },
    id_kategoriya: {
      type: String,
      required: true
    },
    naimenovanie: {
      type: String,
      required: true
    },
    cena: {
      type: mongoose.Decimal128,
      required: true
    }
  },
  { versionKey: false }
);

mongoose.model("Bufet", bufetSchema);
