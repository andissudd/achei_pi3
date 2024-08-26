import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { Item } from "../entities/Item";
import { Category } from "../entities/Category";
import { Booking } from "../entities/Booking";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "mydb.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Role, Item, Category, Booking],
  migrations: [],
  subscribers: [],
});