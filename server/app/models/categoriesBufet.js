const mongoose = require("mongoose");

const categoriesBufetSchema = mongoose.Schema(
  {
    kategoriya: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

mongoose.model("CategoriesBufet", categoriesBufetSchema);
