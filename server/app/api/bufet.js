const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getBufets = (Bufet) => (req, res) => {
  Bufet.find({}, (error, bufets) => {
    if (error) throw error;
    return res.status(200).json({ success: true, bufets: bufets });
  });
};

api.newBufet = (Bufet) => (req, res) => {
  if (
    !req.body.id_uchrezhdenia ||
    !req.body.id_kategoriya ||
    !req.body.naimenovanie ||
    !req.body.cena
  )
    res.status(400).json({
      success: false,
      message: "Пожалуйста, заполните все поля!",
    });
  else {
    const newBufet = new Bufet({
      id_uchrezhdenia: req.body.id_uchrezhdenia,
      id_kategoriya: req.body.id_kategoriya,
      naimenovanie: req.body.naimenovanie,
      cena: req.body.cena,
    });

    newBufet.save((err) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, message: "Ошибка сохранения." });
      else
        return res
          .status(201)
          .json({ success: true, message: "Товар буфета успешно сохранен." });
    });
  }
};

api.modifyBufet = (Bufet) => (req, res) => {
  let newBufetData = req.body;

  let id = { _id: newBufetData._id };
  delete newBufetData._id;

  Bufet.findByIdAndUpdate(id, newBufetData, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Ошибка изменения данных пользователя.",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Изменение данных пользователя прошло успешно.",
      });
    }
  });
};

api.deleteBufet = (Bufet) => (req, res) => {
  Bufet.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Ошибка при удалении пользователя.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Пользователь успешно удален.",
      });
    }
  });
};

module.exports = api;
