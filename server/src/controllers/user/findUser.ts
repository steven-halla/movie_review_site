import {assertUserIdIsAuthed} from "../../auth/assertUserIdIsAuthed";
import {db} from "../../models";

export const findUser = (req, res) => {
  const userId = req.params.id;

  if (!assertUserIdIsAuthed(req, res, userId)) {
    return;
  }

  db.User.findByPk(userId)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
};
