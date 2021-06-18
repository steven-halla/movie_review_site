const {authJwt} = require("../middleware");
const movie = require("../controllers/movie");
const movie_review = require("../controllers/movie")


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      // "Access-Control-Allow-Credentials: true",
      //should I change x-access-token to auth ?
      "x-access-token, Origin, Content-type, Accept"
    );
    next();
  });

  // app.get("/test/all", movie.allAccess);
  //
  // app.get(
  //     "/test/movie",
  //     [authJwt.verifyToken],
  //     movie.movieBoard
  // );
  //
  // app.get(
  //     "/test/mod",
  //     [authJwt.verifyToken, authJwt.isModerator],
  //     movie.moderatorBoard
  // );
  //
  // app.get(
  //     "/test/admin",
  //     [authJwt.verifyToken, authJwt.isAdmin],
  //     movie.adminBoard
  // );

  //line 40 i added contents inside square brackets

  app.get(
    "/movies",
    [],
    movie.findAllMovies
  );

  app.get(
    "/movies/:id",
    [],
    movie.findMovie
  );
  app.post(
    "/movies",
    [authJwt.verifyToken, /*authJwt.isAdmin*/],
    movie.createMovie
  );
  app.put(
    "/movies/:id",
    [authJwt.verifyToken, /*authJwt.isAdmin*/],
    movie.updateMovie
  );
  app.delete(
    "/movies/:id",
    [authJwt.verifyToken, /*authJwt.isAdmin*/],
    movie.deleteMovie
  );

  // movie review endpoints

  // should I take review out of uRl?
  app.patch(
    "/movies/:id/reviews",
    [authJwt.verifyToken],
    movie.updateMovieReview
  );
  // ***going to take out reviews in url to see if it works lets hope it doesn' tbreak anything***
  app.get(
    "/movies/:id/reviews",
    [],
    movie.getMovieReviews
  );

  app.delete(
    "/movies/reviews/:id",
    [authJwt.verifyToken],
    movie_review.deleteReview
  );

};
export {}