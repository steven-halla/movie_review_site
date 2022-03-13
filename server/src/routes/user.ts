import {uploadAvatarImage} from "../controllers/user";

const {authJwt} = require("../middleware");
const user = require("../controllers/user");
const movie_review = require("../controllers/movie")

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-type, Accept"
    );
    next();
  });

  app.get(
    "/users",
    user.findAllUsers
  )

  app.get(
    "/users/:id/profile",
    user.getUserProfile
  );

  app.get(
    "/users/:id/reviews",
    user.getUserReviews
  );

  app.get(
    "/users",
    [authJwt.verifyToken/*, authJwt.isAdmin*/],
    user.findAllUsers
  );

  app.get(
    "/users/:id",
    [authJwt.verifyToken],
    user.findUser
  );

  //image upload this is our get endpoint
  app.get(
    "/users/:id/profile/avatar",
    [authJwt.verifyToken],
    user.findUser
  )

  app.post(
    "/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    user.createUser
  );

  //image upload this is our post endpoint
  app.post(
    "/users/:id/profile/avatar",
    [authJwt.verifyToken],
    user.uploadAvatarImage
  )

  app.patch(
    "/users/:id",
    [authJwt.verifyToken],
    user.updateUser
  );
  app.delete(
    "/users/:id",
    [authJwt.verifyToken],
    user.deleteUser
  );

  app.delete(
    "/users/reviews/:id",
    // [authJwt.verifyToken, /*authJwt.isAdmin*/],
    movie_review.deleteReview
  );

  app.post(
    "/users/:id/profile/avatar",
    [authJwt.verifyToken],
    uploadAvatarImage
  );

};


export {}
