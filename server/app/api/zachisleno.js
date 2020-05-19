const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getZachisleno = Zachisleno => (req, res) => {
  Zachisleno.find({}, (error, zachisleno) => {
    if (error) throw error;
    res.status(200).json({ success: true, zachisleno: zachisleno });
  });
};

api.newZachisleno = Zachisleno => (req, res) => {};

api.modifyZachisleno = Zachisleno => (req, res) => {};

api.deleteZachisleno = Zachisleno => (req, res) => {};

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
