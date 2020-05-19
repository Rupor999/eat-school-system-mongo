const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  config = require("@config");

const api = {};

api.login = User => (req, res) => {
  User.findOne({ number: req.body.number }, (error, user) => {
    if (error) throw error;

    if (!user)
      res.status(401).send({
        success: false,
        message: "Authentication failed. User not found."
      });
    else {
      user.comparePassword(req.body.password, (error, matches) => {
        if (matches && !error) {
          const token = jwt.sign({ user: user._id }, config.secret);
          res.json({
            success: true,
            message: "Token granted",
            token,
            user: { id: user._id, fio: user.fio, role: user.role }
          });
        } else {
          res.status(401).send({
            success: false,
            message: "Authentication failed. Wrong number/password."
          });
        }
      });
    }
  });
};

api.verify = headers => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(" ");
    if (split.length === 2) return split[1];
    else return null;
  } else return null;
};

api.getaccountinfo = (User, Secret) => ({ headers }, res) => {
  const secret = Secret;
  if (headers && headers.authorization) {
    const split = headers.authorization.split(" ");
    if (split.length === 2) {
      const token = split[1];
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          console.log(err);
          return res
            .status(403)
            .send({ success: false, message: "Unauthorized or bad token" });
        }
        User.findById(decoded.user, (error, user_info) => {
          if (error) throw error;
          res.status(200).json({
            success: true,
            message: "User info send - OK",
            user: { id: decoded.user, fio: user_info.fio, role: user_info.role }
          });
          // console.log(user);
        });
      });
    } else {
      return res
        .status(403)
        .send({ success: false, message: "Unauthorized or bad token" });
    }
  } else {
    return res
      .status(403)
      .send({ success: false, message: "Unauthorized or bad token" });
  }
};

module.exports = api;
