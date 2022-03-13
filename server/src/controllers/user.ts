const {assertUserIdIsAuthed} = require("../middleware/assertUserIdIsAuthed");
const fs = require('fs');
const AWS = require('aws-sdk');

const db = require("../models");
const {User, Movie, MovieReview} = db;


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

/***
 * Upload user profile image.
 * Steps:
 * 1. get user by id from url path.
 *    - if user does not exist, return 400.
 * 2. take the uploaded file from the request and copy to folder or s3.
 * 3. take the path of the photo and save it to User.avatarUrl.
 * @param req contains a user uploaded file, TODO restrict to PNG/JPG/JPEG
 * @param res
 */
export const uploadAvatarImage = (req, res) => {
  const userId = req.params.id;

  User.findByPk(userId)
    .then(user => {
      return uploadProfileAvatar(req, res)
        .then(uploadProfileAvatarResponse => {
          user.avatarUrl = uploadProfileAvatarResponse.filePath;
          user.save();
          return res.json(user);
        });
    })
    .catch(err => res.status(400).json(err));

}

export const uploadProfileAvatar = (req, res) => {
  if (req.files === null) {
    return res.status(400).json({msg: 'No file uploaded'});
  }

  const file = req.files.file;
  const newFilePath = `${__dirname}/client/public/uploads/${file.name}`;

  console.log(newFilePath);
  //change the function below to write to an S3 bucket
  file.mv(newFilePath, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  return res.json({
    fileName: file.name,
    filePath: newFilePath
  });
}

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: "avatar-image-uploader",
    Key: '', // File name you want to save as in S3
    Body: fileContent
  };

  // Uploading files to the bucket
  // s3.upload(params, function(err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(`File uploaded successfully. ${data.Location}`);
  // });
};


module.exports = {
  createUser,
  findAllUsers,
  findUser,
  getUserProfile,
  getUserReviews,
  updateUser,
  deleteUser,
  uploadAvatarImage
};
export {};
