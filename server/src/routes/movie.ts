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

  app.patch(
    "/movies/:id/reviews",
    [authJwt.verifyToken],
    movie.updateMovieReview
  );

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
