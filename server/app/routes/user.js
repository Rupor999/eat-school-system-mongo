const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = app => {
  const api = app.app.api.user;
  app.post(config.API_VERSION + "setup", api.createTestAdmin(models.User));
  app.post(config.API_VERSION + "signup", api.signup(models.User));
  //
  app.get(
    config.API_VERSION + "users",
    passport.authenticate("jwt", config.session),
    api.getUsers(models.User, app.get("ess-secret"))
  );
  //
  app.post(
    config.API_VERSION + "users",
    passport.authenticate("jwt", config.session),
    api.newUser(models.User)
  );
  app.put(
    config.API_VERSION + "users",
    passport.authenticate("jwt", config.session),
    api.modifyUser(models.User)
  );

  app.delete(
    config.API_VERSION + "users",
    passport.authenticate("jwt", config.session),
    api.deleteUser(models.User)
  );
};
