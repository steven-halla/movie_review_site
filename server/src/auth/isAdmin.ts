import {db} from "../models"
import {NextFunction, RequestHandler, Response} from "express";
import {TypedRequest} from "../lib/TypedRequest";

export const isAdmin: RequestHandler = (req: TypedRequest, res: Response, next: NextFunction) => {
  if (req.userId == null) {
    res.status(403).send({
      message: "Require Admin Role"
    });
    return;
  }

  db.User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role"
      });
    });
  });
};
