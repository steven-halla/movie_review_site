import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import {useAuthRoutes} from "./routes/useAuthRoutes";
import {useUserRoutes} from "./routes/useUserRoutes";
import {useMovieRoutes} from "./routes/useMovieRoutes";

import {db} from './models'; // importing inorder to init db.

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload());

useAuthRoutes(app);
useUserRoutes(app);
useMovieRoutes(app);

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));

//npm run start for client
//nodemon server.ts for server


