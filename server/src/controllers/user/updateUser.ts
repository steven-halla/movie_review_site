import {assertUserIdIsAuthed} from "../../auth/assertUserIdIsAuthed";
import {db} from "../../models";

export const updateUser = (req, res) => {
  const userId = req.params.id;

  if (!assertUserIdIsAuthed(req, res, userId)) {
    return;
  }

  db.User.findByPk(userId)
    .then(user => {
      user.update(req.body)
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
};
