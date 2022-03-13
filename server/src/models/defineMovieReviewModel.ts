import {BuildOptions, DataTypes, Model} from "sequelize";
import {MovieReview} from "./MovieReview";

// https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize
export interface MovieReviewModel extends Model<MovieReview>, MovieReview {}

// Note that sequelize define() returns a ModelStatic
export type MovieReviewStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MovieReviewModel;
};

export const defineMovieReviewModel = (sequelize, User, Movie): MovieReviewStatic => {
  console.log("initializing movie_review model.");

  const MovieReview = <MovieReviewStatic>sequelize.define('movie_reviews', {
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

  return MovieReview;
};
