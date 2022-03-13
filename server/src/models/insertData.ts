import {MovieStatic} from "./defineMovieModel";
import {RoleStatic} from "./defineRoleModel";

export const insertRolesData = async (Role: RoleStatic) => {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
};

export const insertMoviesData = async (Movie: MovieStatic) => {
  Movie.create({
    id: 1,
    title: "Batman and Robin",
    rating: 5
  })
};
