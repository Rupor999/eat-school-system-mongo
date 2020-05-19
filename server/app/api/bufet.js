const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getBufets = Bufet => (req, res) => {
  Bufet.find({}, (error, bufets) => {
    if (error) throw error;
    return res.status(200).json({ success: true, bufets: bufets });
  });
};

api.newBufet = Bufet => (req, res) => {};

api.modifyBufet = Bufet => (req, res) => {};

api.deleteBufet = Bufet => (req, res) => {};

module.exports = api;
