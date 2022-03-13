import {db} from "../../models";

export const getUserProfile = (req, res) => {
  const userId = req.params.id;

  db.User.findByPk(userId)
    .then(user => res.json({
      id: user.id,
      displayName: user.displayName
    }))
    .catch(err => res.status(400).json(err));
};
