const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = (app) => {
  const api = app.app.api.auth;
  app.get("/", (req, res) => res.send("Eat School System API"));
  //
  app.get(
    config.API_VERSION + "getaccountinfo",
    // test,
    passport.authenticate("jwt", config.session),
    api.getaccountinfo(models.User, app.get("ess-secret"))
  );
  app.post(config.API_VERSION + "auth", api.login(models.User));
};

// function test(req, res, next) {
//   console.log(req.headers);
//   next();
// }
