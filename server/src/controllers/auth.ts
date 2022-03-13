const db = require("../models");
const config = require("../config/auth");
const User = db.User;
const Role = db.Role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.signup = (req, res) => {

  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    displayName: req.body.displayName,
  }).then(user => {
    if (req.body.roles) {
      Role.findAll({
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
      //user role = 1
      user.setRoles([1]).then(() => {
        res.send({message: "user registered successfully"});
      });
    }
  })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
};

exports.signin = (req, res) => {
  User.findOne({
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
        user.password
      );
      console.log("password is valid" + passwordIsValid)
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "invalid password"
        });
      }

      const token = jwt.sign({id: user.id}, config.secret, {
        //24 hours
        expiresIn: 86400
      });

      const authorities = [];
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
export {};
