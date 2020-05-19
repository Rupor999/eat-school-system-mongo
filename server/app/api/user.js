const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

//ТЕСТОВАЯ ФУНКЦИЯ ДОБАВЛЕНИЯ ЮЗЕРА-АДМИНА
api.createTestAdmin = User => (req, res) => {
  // const admin = new User({
  //   number: 9209281024,
  //   password: "124",
  //   fio: {
  //     surname: "Панфилов",
  //     name: "Илья",
  //     midname: "Андреевич"
  //   },
  //   role: 1
  // });
  const admin = new User({
    number: 9209281023,
    password: "124",
    fio: {
      surname: "Иванов",
      name: "Иван",
      midname: "Иванович"
    },
    role: 1
  });

  admin.save(error => {
    try {
      if (error) throw error;
      console.log("Admin account was succesfully set up");
      res.json({ success: true });
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  });
};

//ФУНКЦИЯ ВЫВОДА ВСЕХ ЮЗЕРОВ
//СОМНИТЕЛЬНАЯ ПРОВЕРКА ТОКЕНА
api.getUsers = (User, Token) => (req, res) => {
  console.log(req.headers); /////////////////////////////////////////////////////////////////////////////
  const token = Token;
  if (token) {
    User.find({}, (error, users) => {
      if (error) throw error;
      res.status(200).json({ success: true, users: users });
    });
  } else
    return res.status(403).send({ success: false, message: "Unauthorized" });
};

// УБРАТЬ ПОСЛЕ СОЗДАНИЯ СВОИХ ФУНКЦИЙ//////////////////////////////////////////////////////////////////////
api.signup = User => (req, res) => {
  if (
    !req.body.number ||
    !req.body.password ||
    !req.body.surname ||
    !req.body.name ||
    !req.body.midname ||
    !req.body.role
  )
    res.json({
      success: false,
      message: "Пожалуйста, заполните все поля!"
    });
  else {
    const newUser = new User({
      number: req.body.number,
      password: req.body.password,
      surname: req.body.surname,
      name: req.body.name,
      midname: req.body.midname,
      role: req.body.role
    });
    newUser.save(error => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "Ошибка сохранения." });
      res.json({ success: true, message: "Аккаунт успешно сохранен." });
    });
  }
};

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////Функции для работы с аккаунтами
// Добавление нового(-ых) пользователей
api.newUser = User => (req, res) => {
  if (
    !req.body.number ||
    !req.body.password ||
    !req.body.surname ||
    !req.body.name ||
    !req.body.midname ||
    !req.body.role
  )
    res.status(400).json({
      success: false,
      message: "Пожалуйста, заполните все поля!"
    });
  else {
    User.findOne({ number: req.body.number }, (err, user) => {
      if (err || user) {
        res.status(400).json({
          success: false,
          message:
            "Произошла ошибка или данный телефонный номер уже зарегистрирован!"
        });
      } else {
        const newUser = new User({
          number: req.body.number,
          password: req.body.password,
          fio: {
            surname: req.body.surname,
            name: req.body.name,
            midname: req.body.midname
          },
          role: req.body.role
        });
        newUser.save(err => {
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
    });
  }
};
// Модификация пользователя
api.modifyUser = User => (req, res) => {
  User.findByIdAndUpdate(req.body._id, req.body.changes, (err, user) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Ошибка изменения данных пользователя."
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Изменение данных пользователя прошло успешно."
      });
    }
  });
};
// Удаление пользователя
api.deleteUser = User => (req, res) => {
  User.findByIdAndRemove(req.body._id, err => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Ошибка при удалении пользователя."
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Пользователь успешно удален."
      });
    }
  });
};
////////////////////////////////////////////////////////////////////////////////

module.exports = api;
