const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getRashodovano = (Rashodovano) => (req, res) => {
  Rashodovano.find({})
    .populate("id_bufet")
    .exec((error, rashodovano) => {
      if (error) throw error;
      return res.status(200).json({ success: true, rashodovano: rashodovano });
    });
};

api.newRashodovano = (Rashodovano) => (req, res) => {};

api.modifyRashodovano = (Rashodovano) => (req, res) => {};

api.deleteRashodovano = (Rashodovano) => (req, res) => {};

module.exports = api;
