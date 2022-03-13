import {db} from "../../models";

export const deleteMovie = (req, res) => {
  db.Movie.findByPk(req.params.id)
    .then(movie => {
      movie.destroy()
        .then(deletedMovie => res.json(deletedMovie))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
};
