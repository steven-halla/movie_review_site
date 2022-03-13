import {getMovieReviews} from "../controllers/movie/getMovieReviews";
import {updateMovieReview} from "../controllers/movie/updateMovieReview";
import {deleteReview} from "../controllers/movie/deleteReview";
import {deleteMovie} from "../controllers/movie/deleteMovie";
import {updateMovie} from "../controllers/movie/updateMovie";
import {findMovie} from "../controllers/movie/findMovie";
import {findAllMovies} from "../controllers/movie/findAllMovies";
import {createMovie} from "../controllers/movie/createMovie";
import {verifyToken} from "../auth/verifyToken";

export const useMovieRoutes = (app) => {
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
    findAllMovies
  );

  app.get(
    "/movies/:id",
    [],
    findMovie
  );
  app.post(
    "/movies",
    [verifyToken, /*authJwt.isAdmin*/],
    createMovie
  );
  app.put(
    "/movies/:id",
    [verifyToken, /*authJwt.isAdmin*/],
    updateMovie
  );
  app.delete(
    "/movies/:id",
    [verifyToken, /*authJwt.isAdmin*/],
    deleteMovie
  );

  // movie review endpoints

  app.patch(
    "/movies/:id/reviews",
    [verifyToken],
    updateMovieReview
  );

  app.get(
    "/movies/:id/reviews",
    [],
    getMovieReviews
  );

  app.delete(
    "/movies/reviews/:id",
    [verifyToken],
    deleteReview
  );

};
