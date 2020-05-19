const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getSchools = School => (req, res) => {
  School.find({}, (error, schools) => {
    if (error) throw error;
    return res.status(200).json({ success: true, schools: schools });
  });
};

api.newSchool = School => (req, res) => {};

api.modifySchool = School => (req, res) => {};

api.deleteSchool = School => (req, res) => {};

module.exports = api;
