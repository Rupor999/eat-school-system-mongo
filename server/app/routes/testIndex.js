const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = app => {
  const api = app.app.api.testIndex;

  app.get(
    config.API_VERSION + "testindex",
    passport.authenticate("jwt", config.session),
    api.TestIndexGet(models.TestIndex)
  );

  app.post(
    config.API_VERSION + "testindex",
    passport.authenticate("jwt", config.session),
    api.TestIndexPost(models.TestIndex)
  );

  app.put(
    config.API_VERSION + "testindex",
    passport.authenticate("jwt", config.session),
    api.TestIndexPut(models.TestIndex)
  );
};
