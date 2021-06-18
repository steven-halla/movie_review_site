const {authJwt} = require("../middleware");
const db = require("../models");
const {assertUserIdIsAuthed} = require("../middleware/assertUserIdIsAuthed");
const {User, Movie, MovieReview} = db;

const allAccess = (req, res) => {
  res.status(200).send("public content.");
};

const movieBoard = (req, res) => {
  res.status(200).send("user content");
};

const adminBoard = (req, res) => {
  res.status(200).send("admin content");
};

const moderatorBoard = (req, res) => {
  res.status(200).send("moderator content");
};

const createMovie = (req, res) => {
  Movie.create(req.body)
    .then(movie => {
      console.log(movie);
      res.json(movie);
    });

};
// movie_reviews could also be movies
//do I need to pass in the user id?

// this aligns with our movie_reviews table
const findAllMovies = (req, res) => {
  Movie.findAll()
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json(err));
};


const findMovie = (req, res) => {
  const movieId = req.params.id;

  Movie.findByPk(movieId)
    .then(movie => res.json(movie))
    .catch(err => res.status(400).json(err));
};

const updateMovie = (req, res) => {
  const movieId = req.params.id;

  Movie.findByPk(movieId)
    .then(movie => {
      movie.update(req.body)
        .then(updatedMovie => res.json(updatedMovie))
        .catch(err => res.status(400).json(err));

    })
    .catch(err => res.status(400).json(err));
};

const deleteMovie = (req, res) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      movie.destroy()
        .then(deletedMovie => res.json(deletedMovie))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
};


const deleteReview = (req, res) => {
  const movieReviewId = req.params.id;

  MovieReview
    .findByPk(movieReviewId)
    .then(review => {
      console.log("review: " + JSON.stringify(review));

      // this check asserts the user id in the calling jwt is the same as req.body.userId (for security)
      if (!assertUserIdIsAuthed(req, res, review.userId)) {
        return;
      }

      return MovieReview.destroy({
        where: {
          id: movieReviewId
        }
      });
    })
    .then(review => {
      return res.json(review);
    });
};

const updateMovieReview = (req, res) => {
  const movieId = req.params.id;
  const userId = req.body.userId;
  const rating = req.body.rating;
  const writtenReview = req.body.writtenReview;

  // this check asserts the user id in the calling jwt is the same as req.body.userId (for security)
  // if (!assertUserIdIsAuthed(req, res, userId)) {
  //    return;
  // }

  // 1. fetch movie to ensure it exists
  Movie.findByPk(movieId)
    .then(movie => {
      // 2. movie exists, lets print it!
      console.log("movie: " + JSON.stringify(movie));

      // 3. create our review request
      const reviewRequest = {
        userId: userId,
        movieId: movieId,
        rating: rating,
        writtenReview: writtenReview
      };

      MovieReview
        .findOne({
          where: {
            userId: userId,
            movieId: movieId
          },
          include: [
            {
              model: User,
              attributes: ['id', 'displayName']
            },
            Movie
          ]
        })

        .then((review) => {
          console.log("review: " + JSON.stringify(review));
          if (review != null) {
            return review.update(reviewRequest);
          }
          return MovieReview.create(reviewRequest);
        })
        .then(review => res.json(review));
    })
    .catch(err => res.status(400).json(err));
};

const getMovieReviews = (req, res) => {
  const movieId = req.params.id;
  // 1. fetch movie to ensure it exists
  Movie.findByPk(movieId)
    .then(movie => {
      MovieReview
        .findAll({
          where: {
            movieId: movieId
          },
          include: [
            {
              model: User,
              attributes: ['id', 'displayName']
            },
            Movie
          ]
        })
        .then(reviews => {
          //console.log(reviews);
          res.json(reviews);
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(400).json(err));
};

module.exports = {
  createMovie,
  findAllMovies,
  findMovie,
  updateMovie,
  deleteMovie,
  updateMovieReview,
  getMovieReviews,
  deleteReview
};
export {};