const {verifySignUp} = require("../middleware");
const auth = require("../controllers/auth");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/auth/signup",
    [
      verifySignUp.checkDuplicateDisplayNameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    auth.signup
  );

  app.post("/auth/signin", auth.signin);
};
export {}