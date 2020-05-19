const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

api.getCategoriesBufet = CategoriesBufet => (req, res) => {
  CategoriesBufet.find({}, (error, categoriesBufet) => {
    if (error) throw error;
    res.status(200).json({ success: true, categoriesBufet: categoriesBufet });
  });
};

api.newCategoriesBufet = CategoriesBufet => (req, res) => {};

api.modifyCategoriesBufet = CategoriesBufet => (req, res) => {};

api.deleteCategoriesBufet = CategoriesBufet => (req, res) => {};

module.exports = api;
