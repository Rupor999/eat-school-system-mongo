const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = app => {
  const api = app.app.api.kshp;

  app.get(
    config.API_VERSION + "kshp",
    passport.authenticate("jwt", config.session),
    api.getKshps(models.Kshp)
  );

  app.post(
    config.API_VERSION + "kshp",
    passport.authenticate("jwt", config.session),
    api.newKshp(models.Kshp)
  );

  app.put(
    config.API_VERSION + "kshp",
    passport.authenticate("jwt", config.session),
    api.modifyKshp(models.Kshp)
  );

  app.delete(
    config.API_VERSION + "kshp",
    passport.authenticate("jwt", config.session),
    api.deleteKshp(models.Kshp)
  );
};
