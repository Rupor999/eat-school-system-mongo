const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getPupils = Pupil => (req, res) => {
  Pupil.find({}, (error, pupils) => {
    if (error) throw error;
    res.status(200).json({ success: true, pupils: pupils });
  });
};

api.newPupil = Pupil => (req, res) => {};

api.modifyPupil = Pupil => (req, res) => {};

api.deletePupil = Pupil => (req, res) => {};

module.exports = api;
