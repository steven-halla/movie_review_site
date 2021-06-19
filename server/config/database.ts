// const mysql = require('mysql');

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "steve",
  DB: "tomrottendb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
export {};


// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "steve",
//   DB: "tomrottendb",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };
// export {};