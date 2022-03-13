import {uploadAvatarImage} from "../controllers/user/uploadAvatarImage";
import {isAdmin} from "../auth/isAdmin";
import {deleteReview} from "../controllers/movie/deleteReview";
import {createUser} from "../controllers/user/createUser";
import {findAllUsers} from "../controllers/user/findAllUsers";
import {findUser} from "../controllers/user/findUser";
import {getUserProfile} from "../controllers/user/getUserProfile";
import {updateUser} from "../controllers/user/updateUser";
import {deleteUser} from "../controllers/user/deleteUser";
import {getUserReviews} from "../controllers/user/getUserReviews";

const {authJwt} = require("../auth");

export const useUserRoutes = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-type, Accept"
    );
    next();
  });

  app.get(
    "/users",
    findAllUsers
  )

  app.get(
    "/users/:id/profile",
    getUserProfile
  );

  app.get(
    "/users/:id/reviews",
    getUserReviews
  );

  app.get(
    "/users",
    [authJwt.verifyToken/*, authJwt.isAdmin*/],
    findAllUsers
  );

  app.get(
    "/users/:id",
    [authJwt.verifyToken],
    findUser
  );

  //image upload this is our get endpoint
  app.get(
    "/users/:id/profile/avatar",
    [authJwt.verifyToken],
    findUser
  )

  app.post(
    "/users",
    [authJwt.verifyToken, isAdmin],
    createUser
  );

  //image upload this is our post endpoint
  app.post(
    "/users/:id/profile/avatar",
    [authJwt.verifyToken],
    uploadAvatarImage
  )

  app.patch(
    "/users/:id",
    [authJwt.verifyToken],
    updateUser
  );
  app.delete(
    "/users/:id",
    [authJwt.verifyToken],
    deleteUser
  );

  app.delete(
    "/users/reviews/:id",
    // [authJwt.verifyToken, /*authJwt.isAdmin*/],
    deleteReview
  );

  app.post(
    "/users/:id/profile/avatar",
    [authJwt.verifyToken],
    uploadAvatarImage
  );

};
