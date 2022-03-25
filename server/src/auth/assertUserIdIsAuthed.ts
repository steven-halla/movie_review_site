import {getUserIdFromJwt} from "./getUserIdFromJwt";
import {TypedRequest} from "../lib/TypedRequest";
import {Response, Request} from "express";


export const assertUserIdIsAuthed = (req, res: Response, expectedUserId: number) => {
  const jwtUserId = getUserIdFromJwt(req);

  if (jwtUserId != expectedUserId) {
    res.status(401).json({
      "message": "Unauthorized access to user."
    });
    return false;
  }
  return true;
}

