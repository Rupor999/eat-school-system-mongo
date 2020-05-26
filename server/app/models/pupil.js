const mongoose = require("mongoose");

const pupilSchema = mongoose.Schema(
  {
    id_uchenik: {
      type: Number,
      required: false,
    },
    id_school: {
      type: String,
      required: true,
    },
    cifra_kl: {
      type: Number,
      required: true,
    },
    bukva_kl: {
      type: String,
      required: true,
    },
    familia: {
      type: String,
      required: true,
    },
    imya: {
      type: String,
      required: true,
    },
    otchestvo: {
      type: String,
      required: true,
    },
    pol: {
      type: Number,
      required: true,
    },
    mehanizm: {
      type: Number,
      required: true,
      default: 0,
    },
    goryachee_pitanie: {
      type: Boolean,
      required: true,
      default: false,
    },
    bufet: {
      type: Boolean,
      required: true,
      default: false,
    },
    balans_gp: {
      type: mongoose.Decimal128,
      required: true,
      default: 0.0,
    },
    balans_bufet: {
      type: mongoose.Decimal128,
      required: true,
      default: 0.0,
    },
    udalenniy: {
      type: Number,
      required: true,
      default: 0,
    },
    chip_karty: {
      type: String,
      required: false,
      default: "",
    },
    primechanie: {
      type: String,
      required: false,
      default: "",
    },
  },
  { versionKey: false }
);

pupilSchema.pre("save", function (next) {
  if (this.isNew) {
    checkAvailableNumber(this, next);
  }
});

mongoose.model("Pupil", pupilSchema);

async function checkAvailableNumber(schema, next) {
  var record;
  var number;
  var stopCount = 0;

  do {
    number = await generateNumber();
    record = await findRecord(schema, number);
    stopCount++;
    if (stopCount > 100) break;
  } while (record !== null);

  if (stopCount <= 100) {
    schema.id_uchenik = number;
    next();
  } else {
    next("Уникальное значене не найдено!");
  }
}

function findRecord(schema, number) {
  return new Promise((resolve, reject) => {
    schema.constructor.findOne({ id_uchenik: number }, (err, record) => {
      if (err) reject("Ошибка в функции: findRecord -" + err);
      resolve(record);
    });
  });
}

function generateNumber() {
  return new Promise((resolve) => {
    var min = 100000000000;
    var max = 999999999999;
    resolve(Math.floor(Math.random() * (max - min)) + min);
  });
}
