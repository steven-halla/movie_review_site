import fs from "fs";

import {db} from "../../models";


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

  db.User.findByPk(userId)
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

const uploadProfileAvatar = (req, res) => {
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
