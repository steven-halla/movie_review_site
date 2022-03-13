import {BuildOptions, DataTypes, Model} from 'sequelize';
import {Role} from "./Role";

// https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize
export interface RoleModel extends Model<Role>, Role {}

// Note that sequelize define() returns a ModelStatic
export type RoleStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RoleModel;
};

export const defineRoleModel = (sequelize, User): RoleStatic => {

  console.log("initializing role model.");

  const Role = <RoleStatic>sequelize.define('roles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  });

  Role.belongsToMany(User, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });

  User.belongsToMany(Role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });

  return Role;
};
