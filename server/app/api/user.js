const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
const api = {};

//ТЕСТОВАЯ ФУНКЦИЯ ДОБАВЛЕНИЯ ЮЗЕРА-АДМИНА
api.createTestUsers = (User) => (req, res) => {
  const admin = new User({
    number: 9209209201,
    password: "124",
    fio: {
      surname: "Панфилов",
      name: "Илья",
      midname: "Андреевич",
    },
    role: 1,
    additional: {
      children: ["5ddaf31e8b593618b07be94e", "5ddbfb12b24ec70ae02c53ed"],
    },
  });

  const otvzapit = new User({
    number: 9209209202,
    password: "124",
    fio: {
      surname: "Панфилов",
      name: "Илья",
      midname: "Андреевич",
    },
    role: 2,
    additional: {
      children: ["5ddaf31e8b593618b07be94e", "5ddbfb12b24ec70ae02c53ed"],
      school: ["5ddae76c42cb6718b005ff09"],
    },
  });

  const klruk = new User({
    number: 9209209203,
    password: "124",
    fio: {
      surname: "Панфилов",
      name: "Илья",
      midname: "Андреевич",
    },
    role: 3,
    additional: {
      children: ["5ddaf31e8b593618b07be94e", "5ddbfb12b24ec70ae02c53ed"],
      school: ["5ddae76c42cb6718b005ff09"],
      class: [
        { number: 10, letter: "Б" },
        { number: 2, letter: "А" },
      ],
    },
  });

  const kshp = new User({
    number: 9209209204,
    password: "124",
    fio: {
      surname: "Панфилов",
      name: "Илья",
      midname: "Андреевич",
    },
    role: 4,
    additional: {
      children: [],
      school: ["5ddae76c42cb6718b005ff09", "5ddae78742cb6718b005ff0b"],
    },
  });

  const roditel = new User({
    number: 9209209205,
    password: "124",
    fio: {
      surname: "Панфилов",
      name: "Илья",
      midname: "Андреевич",
    },
    role: 5,
    additional: {
      children: ["5ddaf31e8b593618b07be94e", "5ddbfb12b24ec70ae02c53ed"],
    },
  });

  // admin.save((error) => {
  //   if (error) throw error;
  //   return res.json({
  //     success: true,
  //     text: "Admin account was succesfully set up",
  //   });
  // });
  // otvzapit.save((error) => {
  //   if (error) throw error;
  //   return res.json({
  //     success: true,
  //     text: "Otvzapit account was succesfully set up",
  //   });
  // });
  // klruk.save((error) => {
  //   if (error) throw error;
  //   return res.json({
  //     success: true,
  //     text: "Klruk account was succesfully set up",
  //   });
  // });
  kshp.save((error) => {
    if (error) throw error;
    return res.json({
      success: true,
      text: "Kshp account was succesfully set up",
    });
  });
  // roditel.save((error) => {
  //   if (error) throw error;
  //   return res.json({
  //     success: true,
  //     text: "Roditel account was succesfully set up",
  //   });
  // });
};

//ФУНКЦИЯ ВЫВОДА ВСЕХ ЮЗЕРОВ
//СОМНИТЕЛЬНАЯ ПРОВЕРКА ТОКЕНА
api.getUsers = (User, Token) => (req, res) => {
  // console.log(req.headers); /////////////////////////////////////////////////////////////////////////////
  const token = Token;
  if (token) {
    User.find({})
      .populate("additional.children")
      .populate("additional.school")
      .exec((error, users) => {
        if (error) throw error;
        res.status(200).json({ success: true, users: users });
      });
  } else
    return res.status(403).send({ success: false, message: "Unauthorized" });
};

/////////////////////////////////////////////////Функции для работы с аккаунтами
// Добавление нового(-ых) пользователей
api.newUser = (User) => (req, res) => {
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
      message: "Пожалуйста, заполните все поля!",
    });
  else {
    User.findOne({ number: req.body.number }, (err, user) => {
      if (err || user) {
        res.status(400).json({
          success: false,
          message:
            "Произошла ошибка или данный телефонный номер уже зарегистрирован!",
        });
      } else {
        if (req.body.additional.children.length) {
          let temp_mass = req.body.additional.children;
          req.body.additional.children = [];
          for (var i = 0; i < temp_mass.length; i++) {
            req.body.additional.children.push(temp_mass[i].id);
          }
        }

        if (req.body.additional.school.length) {
          let temp_mass = req.body.additional.school;
          req.body.additional.school = [];
          for (var i = 0; i < temp_mass.length; i++) {
            req.body.additional.school.push(temp_mass[i].id);
          }
        }
        const newUser = new User({
          number: req.body.number,
          password: req.body.password,
          fio: {
            surname: req.body.surname,
            name: req.body.name,
            midname: req.body.midname,
          },
          role: req.body.role,
          additional: req.body.additional,
        });
        newUser.save((err) => {
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
api.modifyUser = (User) => (req, res) => {
  let newUserData = req.body;

  let id = { _id: newUserData._id };
  delete newUserData._id;

  for (var i = 0; i < newUserData.additional.children.length; i++) {
    newUserData.additional.children[i] = newUserData.additional.children[i]._id;
  }

  for (var i = 0; i < newUserData.additional.school.length; i++) {
    newUserData.additional.school[i] = newUserData.additional.school[i]._id;
  }

  for (var i = 0; i < newUserData.additional.class.length; i++) {
    delete newUserData.additional.class[i]._id;
  }

  if (newUserData.password.length !== 0) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error)
        return res.status(400).json({
          success: false,
          message: "Ошибка изменения данных пользователя.",
        });
      bcrypt.hash(newUserData["password"], salt, (error, encrypted) => {
        if (error)
          return res.status(400).json({
            success: false,
            message: "Ошибка изменения данных пользователя.",
          });
        newUserData["password"] = encrypted;

        User.findByIdAndUpdate(id, newUserData, (err) => {
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
      });
    });
  } else {
    delete newUserData.password;
    User.findByIdAndUpdate(id, newUserData, (err) => {
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
  }
};
// Удаление пользователя
api.deleteUser = (User) => (req, res) => {
  User.findByIdAndRemove(req.body._id, (err) => {
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
////////////////////////////////////////////////////////////////////////////////

module.exports = api;
