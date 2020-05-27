const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getZachisleno = (Zachisleno) => (req, res) => {
  Zachisleno.find({}, (error, zachisleno) => {
    if (error) throw error;
    return res.status(200).json({ success: true, zachisleno: zachisleno });
  });
};

api.newZachisleno = (Zachisleno) => (req, res) => {
  if (!req.body.id_uchenik || !req.body.nomer_cheka || !req.body.summa)
    res.status(400).json({
      success: false,
      message: "Пожалуйста, заполните все поля!",
    });
  else {
    const newZachisleno = new Zachisleno({
      id_uchenik: req.body._id,
      nomer_cheka: req.body.nomer_cheka,
      summa: req.body.summa,
    });

    newZachisleno.save((err) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, message: "Ошибка сохранения." });
      else
        return res.status(201).json({
          success: true,
          message: "Запись зачислении успешно сохранен.",
        });
    });
  }
};

api.modifyZachisleno = (Zachisleno) => (req, res) => {};

api.deleteZachisleno = (Zachisleno) => (req, res) => {};

module.exports = api;

// let newdata = new Zachisleno({
//   id_uchenik: "id",
//   nomer_cheka: "number",
//   summa: 50.5
// });
//
// newdata.save(error => {
//   try {
//     if (error) throw error;
//     console.log("OK");
//     res.json({ success: true });
//   } catch (e) {
//     console.log(e);
//     res.json(e);
//   }
// });
