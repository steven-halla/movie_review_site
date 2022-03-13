import {db} from "../../models";

export const findAllMovies = (req, res) => {
  db.Movie.findAll()
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json(err));
};
