import jwt from "jsonwebtoken";
import {config as authConfig} from "../config/auth"
import {NextFunction, Request, RequestHandler, Response} from "express";
import {TypedRequest} from "../lib/TypedRequest";

/**
 * After verifying the token is valid, note that we set request.userId to the decoded jwt id (which is our user id)
 */
export const verifyToken: RequestHandler = (req: TypedRequest, res: Response, next: NextFunction) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided"
    });
  }

  jwt.verify(token, authConfig.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized"
      });
    }
    req.userId = decoded.id;
    next();
  });

};
