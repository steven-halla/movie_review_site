import {DataTypes} from 'sequelize';

const defineRoleModel = (sequelize, User) => {

  console.log("initializing role model.");

  const Role = sequelize.define('roles', {
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

module.exports = {
  defineRoleModel
};
export {};
