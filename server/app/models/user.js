const mongoose = require("mongoose"),
  bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    fio: {
      type: {
        surname: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        midname: {
          type: String,
          required: true
        }
      }
    },
    role: {
      type: Number,
      required: true
    },
    additional: {
      children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pupil" }],
      school: [{ type: mongoose.Schema.Types.ObjectId, ref: "School" }],
      class: [{ number: Number, letter: String }]
    }
  },
  { versionKey: false }
);

userSchema.pre("save", function(next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);
      bcrypt.hash(user.password, salt, (error, encrypted) => {
        if (error) return next(error);
        user.password = encrypted;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, (error, matches) => {
    if (error) return callback(error);
    callback(null, matches);
  });
};

mongoose.model("User", userSchema);
