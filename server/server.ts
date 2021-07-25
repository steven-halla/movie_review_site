const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./models');

require('./routes/auth')(app);
require('./routes/user')(app);
require('./routes/movie')(app);

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));

//npm run start for client
//nodemon server.ts for server

//how to update on AWS?
//

// website for aws beanstalk error
//https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-platform-dependencies.html
