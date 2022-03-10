const {assertUserIdIsAuthed} = require("../middleware/assertUserIdIsAuthed");

const db = require("../models");
const {User, Movie, MovieReview} = db;

//
// const allAccess = (req, res) => {
//     res.status(200).send("Public Content.");
// };
//
// const userBoard = (req, res) => {
//     res.status(200).send("User Content");
// };
//
// const adminBoard = (req, res) => {
//     res.status(200).send("Admin Content");
// };
//
// const moderatorBoard = (req, res) => {
//     res.status(200).send("Moderator Content");
// };

const createUser = (req, res) => {
  User.create(req.body)
    .then(user => {
      console.log(user);
      res.json(user);
    });
};
//i should create helper function for exclude just in case I forget to put password
const findAllUsers = (req, res) => {
  User.findAll({attributes: {exclude: ['password', 'email', 'createdAt', 'updatedAt']}})
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err));
};


const findUser = (req, res) => {
  const userId = req.params.id;

  if (!assertUserIdIsAuthed(req, res, userId)) {
    return;
  }

  User.findByPk(userId)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
};

const getUserProfile = (req, res) => {
  const userId = req.params.id;

  User.findByPk(userId)
    .then(user => res.json({
      id: user.id,
      displayName: user.displayName
    }))
    .catch(err => res.status(400).json(err));
};

const updateUser = (req, res) => {
  const userId = req.params.id;

  if (!assertUserIdIsAuthed(req, res, userId)) {
    return;
  }

  User.findByPk(userId)
    .then(user => {
      user.update(req.body)
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
};

const deleteUser = (req, res) => {
  const userId = req.params.id;

  if (!assertUserIdIsAuthed(req, res, userId)) {
    return;
  }

  console.log(req.params);
  User.findByPk(userId)
    .then(user => {
      user.destroy()
        .then(deletedUser => res.json(deletedUser))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
};

const getUserReviews = (req, res) => {
  const userId = req.params.id;
  // 1. fetch movie to ensure it exists
  User.findByPk(userId)
    .then(user => {
      // 2. movie exists, lets print it!
      console.log("user: " + JSON.stringify(user));

      // 3. now go read the reviews for the movie.
      MovieReview
        .findAll({
          where: {
            userId: userId
          },
          include: [
            {
              model: User,
              attributes: ['id', 'displayName']
            },
            Movie
          ]
        })
        .then(reviews => {
          console.log(reviews);
          res.json(reviews);
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(400).json(err));
};

module.exports = {
  createUser,
  findAllUsers,
  findUser,
  getUserProfile,
  getUserReviews,
  updateUser,
  deleteUser
};
export {};
