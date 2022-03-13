import {Movie} from "../../../client/src/model/Movie";

const {DataTypes} = require('sequelize');

const defineMovieModel = (sequelize, User): Movie => {
  console.log("initializing movie model.");

  // we had " const Movie = ", switching this out for return
  const Movie = sequelize.define('movies', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: DataTypes.STRING,
      rating: DataTypes.INTEGER, // average rating, TODO
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
  );


  Movie.belongsToMany(User, {
    through: "user_movies",
    foreignKey: "movieId",
    otherKey: "userId"
  });
  //
  User.belongsToMany(Movie, {
    through: "user_movies",
    foreignKey: "userId",
    otherKey: "movieId"
  });

  return Movie;
};

module.exports = {
  defineMovieModel
}
export {};

