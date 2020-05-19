const mongoose = require("mongoose");

const zachislenoSchema = mongoose.Schema(
  {
    id_uchenik: {
      type: String,
      required: true
    },
    data_zachislenia: {
      type: Date,
      required: true,
      default: Date.now
    },
    nomer_cheka: {
      type: String,
      required: true
    },
    summa: {
      type: mongoose.Decimal128,
      required: true
    }
  },
  { versionKey: false }
);

mongoose.model("Zachisleno", zachislenoSchema);
