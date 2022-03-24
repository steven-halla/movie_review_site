import {checkRolesExisted} from "../auth/checkRolesExisted";
import {checkDuplicateDisplayNameOrEmail} from "../auth/checkDuplicateDisplayNameOrEmail";
import {signin} from "../controllers/auth/signin";
import {signup} from "../controllers/auth/signup";

export const useAuthRoutes = (app) => {
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
      checkDuplicateDisplayNameOrEmail,
      checkRolesExisted
    ],
    signup
  );

  app.post("/auth/signin", signin);
};

