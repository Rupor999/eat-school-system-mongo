const mongoose = require("mongoose");

const testSchema = mongoose.Schema(
  {
    name: String,
    additional: {
      city: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "City"
        }
      ],
      user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      prosto: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    }
  },
  { versionKey: false }
);

mongoose.model("TestIndex", testSchema);
