import {BuildOptions, DataTypes, Model} from "sequelize";
import {Movie} from "./Movie";

// https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize
export interface MovieModel extends Model<Movie>, Movie {}

// Note that sequelize define() returns a ModelStatic
export type MovieStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MovieModel;
};

export const defineMovieModel = (sequelize, User): MovieStatic => {
  console.log("initializing movie model.");

  // we had " const Movie = ", switching this out for return
  const Movie = <MovieStatic>sequelize.define('movies', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: DataTypes.STRING,
      rating: DataTypes.INTEGER, // average rating, TODO
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    }
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
