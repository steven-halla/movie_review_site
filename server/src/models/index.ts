import {config} from "../config/database";
import {Sequelize} from "sequelize";
import {defineMovieReviewModel} from "./defineMovieReviewModel";
import {defineUserModel} from "./defineUserModel";
import {defineRoleModel} from "./defineRoleModel";
import {defineMovieModel} from "./defineMovieModel";

import {insertMoviesData, insertRolesData} from "./insertData";
import {DB} from "./DB";

const sequelize = new Sequelize(
  config.db,
  config.user,
  config.password,
  {
    dialect: config.dialect,
    host: config.host,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const User = defineUserModel(sequelize);
const Role = defineRoleModel(sequelize, User);
const Movie = defineMovieModel(sequelize, User);
const MovieReview = defineMovieReviewModel(sequelize, User, Movie);

sequelize.sync();

const initialize = false;
if (initialize) {
  insertRolesData(Role);
  insertMoviesData(Movie);
}

export const db: DB = {
  sequelize: sequelize,
  Movie: Movie,
  MovieReview: MovieReview,
  Role: Role,
  User: User,
  allRoles: ["user", "admin", "moderator"]
};
