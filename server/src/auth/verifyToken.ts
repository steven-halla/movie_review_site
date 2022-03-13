import jwt from "jsonwebtoken";
import {config as authConfig} from "../config/auth"

export const verifyToken = (req, res, next) => {
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
