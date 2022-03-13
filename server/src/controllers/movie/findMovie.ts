import {db} from "../../models";

export const findMovie = (req, res) => {
  const movieId = req.params.id;

  db.Movie.findByPk(movieId)
    .then(movie => res.json(movie))
    .catch(err => res.status(400).json(err));
};
