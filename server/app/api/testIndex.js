const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.TestIndexGet = (testIndex) => (req, res) => {
  // testIndex.find({}, (error, testindex) => {
  //   if (error) throw error;
  //   return res.status(200).json({ success: true, testindex: testindex });
  // });
  testIndex
    .find({})
    .populate("additional.prosto")
    .populate("additional.city")
    .populate("additional.user")
    .exec(function (err, test) {
      if (err) return console.log(err);
      console.log("Found:");
      console.log(test);
      return res.status(200).json({ success: true, test: test });
    });
};

api.TestIndexPost = (testIndex) => (req, res) => {
  const test = new testIndex({
    name: "2",
    additional: {
      city: ["5ddace5daa071115dca62db5", "5ddad309c7c6b115dc4033c3"],
      user: [
        "5d7175f05a1a842c1cfee98a",
        "5d9754a2891113084ca7473e",
        "5d8fc47e6d4ea9460873e974",
      ],
    },
  });

  test.save((err) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({ success: true });
    }
  });
};

api.TestIndexPut = (testIndex) => (req, res) => {
  testIndex.findById("5ec2e3bd0a4ff14eb09a7689", (err, doc) => {
    // let prosto = doc.additional.prosto;
    // console.log(prosto);
    // prosto.push("5d97552f7dacd547b87665ae");
    doc.additional.prosto.push("5d97552f7dacd547b87665ae");
    // console.log(doc.additional.prosto);
    doc.save((err) => {
      return res
        .status(200)
        .json({ success: true, text: "Успешно добавлено и сохранено" });
    });
  });
};

module.exports = api;
