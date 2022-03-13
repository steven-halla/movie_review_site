import jwt from "jsonwebtoken";

export const getUserIdFromJwt = (req) => {
  const token = req.headers["authorization"];
  const parsedToken = jwt.decode(token);
  const userId = Number(parsedToken.id);
  return userId;
}
