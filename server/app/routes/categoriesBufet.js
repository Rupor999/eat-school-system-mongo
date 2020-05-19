const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = app => {
  const api = app.app.api.categoriesBufet;

  app.get(
    config.API_VERSION + "categoriesBufet",
    passport.authenticate("jwt", config.session),
    api.getCategoriesBufet(models.CategoriesBufet)
  );

  app.post(
    config.API_VERSION + "categoriesBufet",
    passport.authenticate("jwt", config.session),
    api.newCategoriesBufet(models.CategoriesBufet)
  );

  app.put(
    config.API_VERSION + "categoriesBufet",
    passport.authenticate("jwt", config.session),
    api.modifyCategoriesBufet(models.CategoriesBufet)
  );

  app.delete(
    config.API_VERSION + "categoriesBufet",
    passport.authenticate("jwt", config.session),
    api.deleteCategoriesBufet(models.CategoriesBufet)
  );
};
