import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import {User} from "./User";

// https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize
export interface UserModel extends Model<User>, User {}

// Note that sequelize define() returns a ModelStatic
export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export const defineUserModel = (sequelize: Sequelize): UserStatic => {

  console.log("initializing user model.");

  return <UserStatic>sequelize.define('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      displayName: DataTypes.STRING,
      avatarUrl: DataTypes.STRING
    },
  );

};
