import {db} from "../../models";

export const updateMovieReview = (req, res) => {
  const movieId = req.params.id;
  const userId = req.body.userId;
  const rating = req.body.rating;
  const writtenReview = req.body.writtenReview;

  // this check asserts the user id in the calling jwt is the same as req.body.userId (for security)
  // if (!assertUserIdIsAuthed(req, res, userId)) {
  //    return;
  // }

  // 1. fetch movie to ensure it exists
  db.Movie.findByPk(movieId)
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

      db.MovieReview
        .findOne({
          where: {
            userId: userId,
            movieId: movieId
          },
          include: [
            {
              model: db.User,
              attributes: ['id', 'displayName']
            },
            db.Movie
          ]
        })

        .then((review) => {
          console.log("review: " + JSON.stringify(review));
          if (review != null) {
            return review.update(reviewRequest);
          }
          return db.MovieReview.create(reviewRequest);
        })
        .then(review => res.json(review));
    })
    .catch(err => res.status(400).json(err));
};
