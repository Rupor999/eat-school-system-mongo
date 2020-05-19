const mongoose = require("mongoose"),
  UserModel = require("@Models/user"),
  BufetModel = require("@Models/bufet"),
  CityModel = require("@Models/city"),
  KshpModel = require("@Models/kshp"),
  SchoolModel = require("@Models/school"),
  PupilModel = require("@Models/pupil"),
  CategoriesBufetModel = require("@Models/categoriesBufet"),
  RashodovanoModel = require("@Models/rashodovano"),
  ZachislenoModel = require("@Models/zachisleno"),
  TestIndexModel = require("@Models/testIndex");

const models = {
  User: mongoose.model("User"),
  Bufet: mongoose.model("Bufet"),
  City: mongoose.model("City"),
  Kshp: mongoose.model("Kshp"),
  School: mongoose.model("School"),
  Pupil: mongoose.model("Pupil"),
  CategoriesBufet: mongoose.model("CategoriesBufet"),
  Rashodovano: mongoose.model("Rashodovano"),
  Zachisleno: mongoose.model("Zachisleno"),

  TestIndex: mongoose.model("TestIndex")
};

module.exports = models;
