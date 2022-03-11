const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const AWS = require('aws-sdk');

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: avatar-image-uploader,
    Key: '', // File name you want to save as in S3
    Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

const app = express();

app.use(fileUpload());

// Upload Endpoint
//change this to reflect need for a user id
app.post('/users/id/profile/avatar', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  console.log(`${__dirname}/client/public/uploads/${file.name}`);
  //change the function below to write to an S3 bucket
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(5000, () => console.log('Server Started...'));
