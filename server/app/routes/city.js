const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = app => {
  const api = app.app.api.city;

  app.get(
    config.API_VERSION + "city",
    passport.authenticate("jwt", config.session),
    api.getCites(models.City)
  );

  app.post(
    config.API_VERSION + "city",
    passport.authenticate("jwt", config.session),
    api.newCity(models.City)
  );

  app.put(
    config.API_VERSION + "city",
    passport.authenticate("jwt", config.session),
    api.modifyCity(models.City)
  );

  app.delete(
    config.API_VERSION + "city",
    passport.authenticate("jwt", config.session),
    api.deleteCity(models.City)
  );
};
