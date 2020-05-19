const mongoose = require("mongoose");

const pupilSchema = mongoose.Schema(
  {
    id_uchenik: {
      type: Number,
      required: true
    },
    id_school: {
      type: String,
      required: true
    },
    cifra_kl: {
      type: Number,
      required: true
    },
    bukva_kl: {
      type: String,
      required: true
    },
    familia: {
      type: String,
      required: true
    },
    imya: {
      type: String,
      required: true
    },
    otchestvo: {
      type: String,
      required: true
    },
    pol: {
      type: Number,
      required: true
    },
    mehanizm: {
      type: Number,
      required: true
    },
    goryachee_pitanie: {
      type: Boolean,
      required: true
    },
    bufet: {
      type: Boolean,
      required: true
    },
    balans_gp: {
      type: mongoose.Decimal128,
      required: true
    },
    balans_bufet: {
      type: mongoose.Decimal128,
      required: true
    },
    udalenniy: {
      type: Number,
      required: true
    },
    chip_karty: {
      type: String,
      required: false
    },
    primechanie: {
      type: String,
      required: false
    }
  },
  { versionKey: false }
);

pupilSchema.pre("save", function(next) {
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
    if (stopCount > 0) {
      console.log("СОВПАДЕНИЕ!" + number + " stopCount: " + stopCount);
    }
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
  return new Promise(resolve => {
    var min = 100000000000;
    var max = 999999999999;
    resolve(Math.floor(Math.random() * (max - min)) + min);
  });
}
