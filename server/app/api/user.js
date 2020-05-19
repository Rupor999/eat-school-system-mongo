const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");
const api = {};

//ТЕСТОВАЯ ФУНКЦИЯ ДОБАВЛЕНИЯ ЮЗЕРА-АДМИНА
api.createTestUsers = User => (req, res) => {
  const admin = new User({
    number: 9209209201,
    password: "124",
    fio: {
      surname: "Панфилов",
      name: "Илья",
      midname: "Андреевич"
    },
    role: 1,
    additional: {
      children: ["5ddaf31e8b593618b07be94e", "5ddbfb12b24ec70ae02c53ed"]
    }
  });

  const otvzapit = new User({
    number: 9209209202,
    password: "124",
    fio: {
      surname: "Панфилов",
      name: "Илья",
      midname: "Андреевич"
    },
    role: 2,
    additional: {
      children: ["5ddaf31e8b593618b07be94e", "5ddbfb12b24ec70ae02c53ed"],
      school: ["5ddae76c42cb6718b005ff09"]
    }
  });

  const klruk = new User({
    number: 9209209203,
    password: "124",
    fio: {
      surname: "Панфилов",
      name: "Илья",
      midname: "Андреевич"
    },
    role: 3,
    additional: {
      children: ["5ddaf31e8b593618b07be94e", "5ddbfb12b24ec70ae02c53ed"],
      school: ["5ddae76c42cb6718b005ff09"],
      class: [{ number: 10, letter: "Б" }, { number: 2, letter: "А" }]
    }
  });

  const kshp = new User({
    number: 9209209204,
    password: "124",
    fio: {
      surname: "Панфилов",
      name: "Илья",
      midname: "Андреевич"
    },
    role: 4,
    additional: {
      children: ["5ddaf31e8b593618b07be94e", "5ddbfb12b24ec70ae02c53ed"],
      school: ["5ddae76c42cb6718b005ff09", "5ddae78742cb6718b005ff0b"]
    }
  });

  const roditel = new User({
    number: 9209209205,
    password: "124",
    fio: {
      surname: "Панфилов",
      name: "Илья",
      midname: "Андреевич"
    },
    role: 5,
    additional: {
      children: ["5ddaf31e8b593618b07be94e", "5ddbfb12b24ec70ae02c53ed"]
    }
  });

  admin.save(error => {
    if (error) throw error;
    return res.json({
      success: true,
      text: "Admin account was succesfully set up"
    });
  });
  otvzapit.save(error => {
    if (error) throw error;
    return res.json({
      success: true,
      text: "Otvzapit account was succesfully set up"
    });
  });
  klruk.save(error => {
    if (error) throw error;
    return res.json({
      success: true,
      text: "Klruk account was succesfully set up"
    });
  });
  kshp.save(error => {
    if (error) throw error;
    return res.json({
      success: true,
      text: "Kshp account was succesfully set up"
    });
  });
  roditel.save(error => {
    if (error) throw error;
    return res.json({
      success: true,
      text: "Roditel account was succesfully set up"
    });
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
