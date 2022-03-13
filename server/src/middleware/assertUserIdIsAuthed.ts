const jwt = require("jsonwebtoken");

const assertUserIdIsAuthed = (req, res, expectedUserId) => {
  const jwtUserId = getUserIdFromJwt(req);

  if (jwtUserId != expectedUserId) {
    res.status(401).json({
      "message": "Unauthorized access to user."
    });
    return false;
  }

  return true;
}

const getUserIdFromJwt = (req) => {
  const token = req.headers["authorization"];
  const parsedToken = jwt.decode(token);
  const userId = Number(parsedToken.id);
  return userId;
}

module.exports = {
  getUserIdFromJwt,
  assertUserIdIsAuthed
};
export {};