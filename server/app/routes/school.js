const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = app => {
  const api = app.app.api.school;

  app.get(
    config.API_VERSION + "school",
    passport.authenticate("jwt", config.session),
    api.getSchools(models.School)
  );

  app.post(
    config.API_VERSION + "school",
    passport.authenticate("jwt", config.session),
    api.newSchool(models.School)
  );

  app.put(
    config.API_VERSION + "school",
    passport.authenticate("jwt", config.session),
    api.modifySchool(models.School)
  );

  app.delete(
    config.API_VERSION + "school",
    passport.authenticate("jwt", config.session),
    api.deleteSchool(models.School)
  );
};
