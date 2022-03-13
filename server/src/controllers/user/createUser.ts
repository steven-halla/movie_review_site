import {db} from "../../models";

export const createUser = (req, res) => {
  db.User.create(req.body)
    .then(user => {
      console.log(user);
      res.json(user);
    });
};
