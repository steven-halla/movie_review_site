import {DataTypes} from "sequelize";

// const User = sequelize.define("users", {Movie});

export const defineUserModel = (sequelize) => {

  console.log("initializing user model.");

  return sequelize.define('users', {
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

// module.exports = {
//   defineUserModel
// };
// export {};
