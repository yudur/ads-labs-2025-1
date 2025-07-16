import { Sequelize } from "sequelize";
import { config } from "./env";

export const sequelize = new Sequelize(config.database_url, {
    dialect: 'postgres',
    logging: false
})