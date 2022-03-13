import {db} from "../../models";
import {config as authConfig} from "../../config/auth";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signin = (req, res) => {
  db.User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({message: "user not found."});
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        // @ts-ignore
        user.password
      );
      console.log("password is valid" + passwordIsValid)
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "invalid password"
        });
      }

      const token = jwt.sign({id: user.id}, authConfig.secretKey, {
        //24 hours
        expiresIn: 86400
      });

      const authorities = [];
      console.log(JSON.stringify(user));
      // @ts-ignore TODO confirm model
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
};
