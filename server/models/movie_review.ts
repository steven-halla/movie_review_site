const {DataTypes} = require('sequelize');

const defineMovieReviewModel = (sequelize, User, Movie): number => {
  console.log("initializing movie_review model.");

  // in mysql work bench i changed our users_movies table to what is defined.

  // changed movie_review to movie_reviews
  const MovieReview = sequelize.define('movie_reviews', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: DataTypes.INTEGER,
      movieId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      writtenReview: DataTypes.STRING
    }, {
      uniqueKeys: {
        userAndMovieUniqueKey: {
          fields: ['userId', 'movieId']
        }
      }
    }
  );
  console.log("associating models")

  MovieReview.hasOne(User, {
    sourceKey: 'userId',
    foreignKey: 'id'
  });

  MovieReview.hasOne(Movie, {
    sourceKey: 'movieId',
    foreignKey: 'id'
  });
  // MovieReview.findAll({
  //     where: {
  //         movieId: 1
  //     },
  //     include: [User]
  // }).then(reviews => {
  //     console.log(JSON.stringify(reviews, null, 2));
  // })

  return MovieReview;
};

module.exports = {
  defineMovieReviewModel
};
export {};