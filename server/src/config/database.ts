import {Dialect} from "sequelize";

export interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  db: string;
  dialect: Dialect;
  pool: DatabasePoolConfig;
}

export interface DatabasePoolConfig {
  max: number;
  min: number;
  acquire: number;
  idle: number;
}

export const config: DatabaseConfig = {
  host: "localhost",
  user: "root",
  password: "steve",
  db: "tomrottendb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


