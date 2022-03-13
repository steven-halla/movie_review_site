const db = require("../models");
const ROLES = db.ROLES;
const User = db.User;

let checkDuplicateDisplayNameOrEmail;
checkDuplicateDisplayNameOrEmail = (req, res, next) => {
  //Username
  User.findOne({
    where: {
      displayName: req.body.displayName
    }

  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Display Name is already in use"
      });
      return;
    }
    //Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use"
        });
        return;
      }
      // what does next do?
      next();
    });
  });
};

let checkRolesExisted;
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(res.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateDisplayNameOrEmail: checkDuplicateDisplayNameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
export {};