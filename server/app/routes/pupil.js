const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = (app) => {
  const api = app.app.api.pupil;

  app.get(
    config.API_VERSION + "pupil",
    passport.authenticate("jwt", config.session),
    api.getPupils(models.Pupil)
  );

  app.post(
    config.API_VERSION + "pupil",
    passport.authenticate("jwt", config.session),
    api.newPupil(models.Pupil)
  );

  app.put(
    config.API_VERSION + "pupil",
    passport.authenticate("jwt", config.session),
    api.modifyPupil(models.Pupil)
  );

  app.delete(
    config.API_VERSION + "pupil",
    passport.authenticate("jwt", config.session),
    api.deletePupil(models.Pupil)
  );

  //оплата
  app.post(
    config.API_VERSION + "pay",
    passport.authenticate("jwt", config.session),
    api.postPay(models.Pupil)
  );
};
