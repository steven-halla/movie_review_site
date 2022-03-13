import {db} from "../../models";

export const updateMovie = (req, res) => {
  const movieId = req.params.id;

  db.Movie.findByPk(movieId)
    .then(movie => {
      movie.update(req.body)
        .then(updatedMovie => res.json(updatedMovie))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
};
