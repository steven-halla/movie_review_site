const config = require("../config/database");
const Sequelize = require("sequelize");
const {defineMovieReviewModel} = require("./movie_review");
const {defineUserModel} = require("./user");
const {defineRoleModel} = require("./role");
const {defineMovieModel} = require("./movie");
const {insertRolesData, insertMoviesData} = require("./insert_data");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,

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

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  User: User,
  Role: Role,
  Movie: Movie,
  MovieReview: MovieReview
};

db.sequelize.sync();

const initialize = false;
if (initialize) {
  insertRolesData(Role);
  insertMoviesData(Movie);
}
//it should be roles, not role
db.Role = ["user", "admin", "moderator"];

module.exports = db;
// export {};
