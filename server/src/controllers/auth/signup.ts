import {db} from "../../models";
import {Op} from "sequelize";
import bcrypt from "bcryptjs";
import {Role} from "../../models/Role";

export const signup = (req, res) => {

  db.User.create({
    email: req.body.email,
    // @ts-ignore TODO confirm model
    password: bcrypt.hashSync(req.body.password, 8),
    displayName: req.body.displayName,
  }).then(user => {
    if (req.body.roles) {
      db.Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({message: "User registered successfully!"});
        });
      });
    } else {
      user.setRoles([1]).then(() => {
        res.send({message: "user registered successfully"});
      });
    }
  })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
};
