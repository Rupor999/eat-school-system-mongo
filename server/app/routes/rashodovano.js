const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = app => {
  const api = app.app.api.rashodovano;

  app.get(
    config.API_VERSION + "rashodovano",
    passport.authenticate("jwt", config.session),
    api.getRashodovano(models.Rashodovano)
  );

  app.post(
    config.API_VERSION + "rashodovano",
    passport.authenticate("jwt", config.session),
    api.newRashodovano(models.Rashodovano)
  );

  app.put(
    config.API_VERSION + "rashodovano",
    passport.authenticate("jwt", config.session),
    api.modifyRashodovano(models.Rashodovano)
  );

  app.delete(
    config.API_VERSION + "rashodovano",
    passport.authenticate("jwt", config.session),
    api.deleteRashodovano(models.Rashodovano)
  );
};
