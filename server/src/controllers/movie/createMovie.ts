import {db} from "../../models";

export const createMovie = (req, res) => {
  db.Movie.create(req.body)
    .then(movie => {
      console.log(movie);
      res.json(movie);
    });

};
