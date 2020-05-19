const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getCites = City => (req, res) => {
  City.find({}, (error, cities) => {
    if (error) throw error;
    return res.status(200).json({ success: true, cities: cities });
  });
};

api.newCity = City => (req, res) => {};

api.modifyCity = City => (req, res) => {};

api.deleteCity = City => (req, res) => {};

module.exports = api;
