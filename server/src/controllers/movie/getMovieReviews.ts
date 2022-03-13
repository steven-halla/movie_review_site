import {db} from "../../models";

export const getMovieReviews = (req, res) => {
  const movieId = req.params.id;
  // 1. fetch movie to ensure it exists
  db.Movie.findByPk(movieId)
    .then(movie => {
      db.MovieReview
        .findAll({
          where: {
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
        .then(reviews => {
          //console.log(reviews);
          res.json(reviews);
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(400).json(err));
};
