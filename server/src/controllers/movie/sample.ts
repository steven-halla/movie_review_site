export const allAccess = (req, res) => {
  res.status(200).send("public content.");
};

export const movieBoard = (req, res) => {
  res.status(200).send("user content");
};

export const adminBoard = (req, res) => {
  res.status(200).send("admin content");
};

export const moderatorBoard = (req, res) => {
  res.status(200).send("moderator content");
};

