import {db} from "../../models";
import {User} from "../../models/User";
import {RequestHandler, Response} from "express";
import {TypedRequest} from "../../lib/TypedRequest";

export const createUser: RequestHandler = (req: TypedRequest<User>, res: Response) => {
  db.User.create(req.body)
    .then((user: User) => {
      console.log(user);
      res.json(user);
    });
};
