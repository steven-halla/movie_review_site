import {Sequelize} from "sequelize";
import {UserStatic} from "./defineUserModel";
import {MovieStatic} from "./defineMovieModel";
import {MovieReviewStatic} from "./defineMovieReviewModel";
import {RoleStatic} from "./defineRoleModel";
import {RoleName} from "./Role";

export interface DB {
  sequelize: Sequelize;
  Movie: MovieStatic;
  MovieReview: MovieReviewStatic;
  Role: RoleStatic;
  User: UserStatic;
  allRoles: RoleName[];
}
