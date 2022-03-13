import {assertUserIdIsAuthed} from "../../auth/assertUserIdIsAuthed";
import {db} from "../../models";

export const deleteUser = (req, res) => {
  const userId = req.params.id;

  if (!assertUserIdIsAuthed(req, res, userId)) {
    return;
  }

  console.log(req.params);
  db.User.findByPk(userId)
    .then(user => {
      user.destroy()
        .then(deletedUser => res.json(deletedUser))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
};
