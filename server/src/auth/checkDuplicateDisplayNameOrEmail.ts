import {db} from "../models";

export const checkDuplicateDisplayNameOrEmail = (req, res, next) => {
  //Username
  db.User.findOne({
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
    db.User.findOne({
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
