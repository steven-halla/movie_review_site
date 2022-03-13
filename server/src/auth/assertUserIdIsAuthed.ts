import {getUserIdFromJwt} from "./getUserIdFromJwt";

export const assertUserIdIsAuthed = (req, res, expectedUserId) => {
  const jwtUserId = getUserIdFromJwt(req);

  if (jwtUserId != expectedUserId) {
    res.status(401).json({
      "message": "Unauthorized access to user."
    });
    return false;
  }

  return true;
}

