import { DataSource } from "typeorm";
import { Role } from "../models/Role";
import { User } from "../models/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User, Role],
  subscribers: [],
  migrations: [],
});
