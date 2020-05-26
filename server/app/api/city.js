const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getCites = (City) => (req, res) => {
  City.find({}, (error, cities) => {
    if (error) throw error;
    return res.status(200).json({ success: true, cities: cities });
  });
};

api.newCity = (City) => (req, res) => {
  if (!req.body.region || !req.body.city_name)
    res.status(400).json({
      success: false,
      message: "Пожалуйста, заполните все поля!",
    });
  else {
    const newCity = new City({
      region: req.body.region,
      city_name: req.body.city_name,
    });

    newCity.save((err) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, message: "Ошибка сохранения." });
      else
        return res
          .status(201)
          .json({ success: true, message: "Новый город успешно сохранен." });
    });
  }
};

api.modifyCity = (City) => (req, res) => {
  let newData = req.body;

  let id = { _id: newData._id };
  delete newData._id;

  City.findByIdAndUpdate(id, newData, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Ошибка изменения данных города.",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Изменение данных города прошло успешно.",
      });
    }
  });
};

api.deleteCity = (City) => (req, res) => {
  City.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Ошибка при удалении города.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Город успешно удален.",
      });
    }
  });
};

module.exports = api;
