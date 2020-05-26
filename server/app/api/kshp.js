const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getKshps = (Kshp) => (req, res) => {
  Kshp.find({}, (error, kshps) => {
    if (error) throw error;
    res.status(200).json({ success: true, kshps: kshps });
  });
};

api.newKshp = (Kshp) => (req, res) => {
  if (!req.body.city_id || !req.body.kombinat)
    res.status(400).json({
      success: false,
      message: "Пожалуйста, заполните все поля!",
    });
  else {
    const newKshp = new Kshp({
      city_id: req.body.city_id,
      kombinat: req.body.kombinat,
    });

    newKshp.save((err) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, message: "Ошибка сохранения." });
      else
        return res
          .status(201)
          .json({ success: true, message: "Новый КШП успешно сохранен." });
    });
  }
};

api.modifyKshp = (Kshp) => (req, res) => {
  let newData = req.body;

  let id = { _id: newData._id };
  delete newData._id;

  Kshp.findByIdAndUpdate(id, newData, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Ошибка изменения данных КШП.",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Изменение данных КШП прошло успешно.",
      });
    }
  });
};

api.deleteKshp = (Kshp) => (req, res) => {
  Kshp.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Ошибка при удалении КШП.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "КШП успешно удален.",
      });
    }
  });
};

module.exports = api;
