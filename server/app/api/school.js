const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getSchools = (School) => (req, res) => {
  School.find({}, (error, schools) => {
    if (error) throw error;
    return res.status(200).json({ success: true, schools: schools });
  });
};

api.newSchool = (School) => (req, res) => {
  if (!req.body.school_name || !req.body.id_kshp || !req.body.id_city)
    res.status(400).json({
      success: false,
      message: "Пожалуйста, заполните все поля!",
    });
  else {
    const newSchool = new School({
      school_name: req.body.school_name,
      id_kshp: req.body.id_kshp,
      id_city: req.body.id_city,
    });

    newSchool.save((err) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, message: "Ошибка сохранения." });
      else
        return res
          .status(201)
          .json({ success: true, message: "Школа успешно сохранена." });
    });
  }
};

api.modifySchool = (School) => (req, res) => {
  let newData = req.body;

  let id = { _id: newData._id };
  delete newData._id;

  School.findByIdAndUpdate(id, newData, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Ошибка изменения данных школы.",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Изменение данных школы прошло успешно.",
      });
    }
  });
};

api.deleteSchool = (School) => (req, res) => {
  School.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Ошибка при удалении школы.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Школа успешно удалена.",
      });
    }
  });
};

module.exports = api;
