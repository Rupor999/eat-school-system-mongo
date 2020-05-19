const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = app => {
  const api = app.app.api.zachisleno;

  app.get(
    config.API_VERSION + "zachisleno",
    passport.authenticate("jwt", config.session),
    api.getZachisleno(models.Zachisleno)
  );

  app.post(
    config.API_VERSION + "zachisleno",
    passport.authenticate("jwt", config.session),
    api.newZachisleno(models.Zachisleno)
  );

  app.put(
    config.API_VERSION + "zachisleno",
    passport.authenticate("jwt", config.session),
    api.modifyZachisleno(models.Zachisleno)
  );

  app.delete(
    config.API_VERSION + "zachisleno",
    passport.authenticate("jwt", config.session),
    api.deleteZachisleno(models.Zachisleno)
  );
};
