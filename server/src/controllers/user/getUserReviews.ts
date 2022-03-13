import {db} from "../../models";

export const getUserReviews = (req, res) => {
  const userId = Number(req.params.id);
  // 1. fetch movie to ensure it exists
  db.User.findByPk(userId)
    .then(user => {
      // 2. movie exists, lets print it!
      console.log("user: " + JSON.stringify(user));

      // 3. now go read the reviews for the movie.
      db.MovieReview
        .findAll({
          where: {
            userId: userId
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
          console.log(reviews);
          res.json(reviews);
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(400).json(err));
};
