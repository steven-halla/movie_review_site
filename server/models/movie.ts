const {DataTypes} = require('sequelize');

// const Movie = sequelize.define("movies", {User});


const defineMovieModel = (sequelize, User) => {
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
      description: DataTypes.STRING
    },
    // Movie.belongsToMany(User, {
    //     through: "movie_user",
    //     as: "users",
    //     foreignKey: "movie_id",
    // })
  );

//user_movies changed to movie_reviews maybe?
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
// user is not being imported from models