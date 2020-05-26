const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getPupils = (Pupil) => (req, res) => {
  Pupil.find({}, (error, pupils) => {
    if (error) throw error;
    res.status(200).json({ success: true, pupils: pupils });
  });
};

api.newPupil = (Pupil) => (req, res) => {
  if (
    !req.body.id_school ||
    !req.body.cifra_kl ||
    !req.body.bukva_kl ||
    !req.body.familia ||
    !req.body.imya ||
    !req.body.otchestvo ||
    !req.body.pol ||
    !req.body.mehanizm ||
    !req.body.goryachee_pitanie ||
    !req.body.bufet
  )
    res.status(400).json({
      success: false,
      message: "Пожалуйста, заполните все поля!",
    });
  else {
    const newPupil = new Pupil({
      id_school: req.body.id_school,
      cifra_kl: req.body.cifra_kl,
      bukva_kl: req.body.bukva_kl,
      familia: req.body.familia,
      imya: req.body.imya,
      otchestvo: req.body.otchestvo,
      pol: req.body.pol,
      mehanizm: req.body.mehanizm,
      goryachee_pitanie: req.body.goryachee_pitanie,
      bufet: req.body.bufet,
    });
    newPupil.save((err) => {
      console.log(err);
      if (err)
        return res
          .status(400)
          .json({ success: false, message: "Ошибка сохранения." });
      else
        return res
          .status(201)
          .json({ success: true, message: "Аккаунт успешно сохранен." });
    });
  }
};

api.modifyPupil = (Pupil) => (req, res) => {
  let newData = req.body;

  let id = { _id: newData._id };
  delete newData._id;

  Pupil.findByIdAndUpdate(id, newData, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Ошибка изменения данных ученика.",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Изменение данных ученика прошло успешно.",
      });
    }
  });
};

api.deletePupil = (Pupil) => (req, res) => {
  Pupil.findByIdAndRemove(req.body._id, (err) => {
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
