//i should create helper function for exclude just in case I forget to put password
import {db} from "../../models";

export const findAllUsers = (req, res) => {
  db.User.findAll({attributes: {exclude: ['password', 'email', 'createdAt', 'updatedAt']}})
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err));
};
