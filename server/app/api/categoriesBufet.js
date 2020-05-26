const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getCategoriesBufet = (CategoriesBufet) => (req, res) => {
  CategoriesBufet.find({}, (error, categoriesBufet) => {
    if (error) throw error;
    res.status(200).json({ success: true, categoriesBufet: categoriesBufet });
  });
};

api.newCategoriesBufet = (CategoriesBufet) => (req, res) => {
  if (!req.body.kategoriya)
    res.status(400).json({
      success: false,
      message: "Пожалуйста, заполните все поля!",
    });
  else {
    const newCategoriesBufet = new CategoriesBufet({
      kategoriya: req.body.kategoriya,
    });

    newCategoriesBufet.save((err) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, message: "Ошибка сохранения." });
      else
        return res.status(201).json({
          success: true,
          message: "Новая категория буфета успешно сохранена.",
        });
    });
  }
};

api.modifyCategoriesBufet = (CategoriesBufet) => (req, res) => {
  let newData = req.body;

  let id = { _id: newData._id };
  delete newData._id;

  CategoriesBufet.findByIdAndUpdate(id, newData, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Ошибка изменения данных категории буфета.",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Изменение данных категории буфета прошло успешно.",
      });
    }
  });
};

api.deleteCategoriesBufet = (CategoriesBufet) => (req, res) => {
  CategoriesBufet.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Ошибка при удалении категории буфета.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Категория буфета успешно удалена.",
      });
    }
  });
};

module.exports = api;
