const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getRashodovano = Rashodovano => (req, res) => {
  Rashodovano.find({}, (error, rashodovano) => {
    if (error) throw error;
    res.status(200).json({ success: true, rashodovano: rashodovano });
  });
};

api.newRashodovano = Rashodovano => (req, res) => {};

api.modifyRashodovano = Rashodovano => (req, res) => {};

api.deleteRashodovano = Rashodovano => (req, res) => {};

module.exports = api;
