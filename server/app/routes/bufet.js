const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = app => {
  const api = app.app.api.bufet;

  app.get(
    config.API_VERSION + "bufet",
    passport.authenticate("jwt", config.session),
    api.getBufets(models.Bufet)
  );

  app.post(
    config.API_VERSION + "bufet",
    passport.authenticate("jwt", config.session),
    api.newBufet(models.Bufet)
  );

  app.put(
    config.API_VERSION + "bufet",
    passport.authenticate("jwt", config.session),
    api.modifyBufet(models.Bufet)
  );

  app.delete(
    config.API_VERSION + "bufet",
    passport.authenticate("jwt", config.session),
    api.deleteBufet(models.Bufet)
  );
};
