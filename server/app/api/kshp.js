const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getKshps = Kshp => (req, res) => {
  Kshp.find({}, (error, kshps) => {
    if (error) throw error;
    res.status(200).json({ success: true, kshps: kshps });
  });
};

api.newKshp = Kshp => (req, res) => {};

api.modifyKshp = Kshp => (req, res) => {};

api.deleteKshp = Kshp => (req, res) => {};

module.exports = api;
