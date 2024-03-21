import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";

import {
  DB_USER,
  DB_HOST,
  DB_PASS,
  DB_DATABASE,
} from "~/configs/database_config";
import { APP_ENV } from "~/configs/app_config";

const databaseCredentials = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: "postgresql",
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: "postgresql",
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: "postgresql",
  },
};

console.log(`Connecting to the database in ${APP_ENV} mode`);
export const connection: { sequelize: Sequelize } = {
  sequelize: new Sequelize(
    databaseCredentials[APP_ENV]["database"],
    databaseCredentials[APP_ENV]["username"],
    databaseCredentials[APP_ENV]["password"],
    {
      host: databaseCredentials[APP_ENV]["host"],
      dialect: "postgres",
      pool: {
        max: 40,
        min: 0,
        acquire: 60000,
        idle: 10000,
      },
      // enable when you want to check the generated SQL by sequelize
      logging: false,
    },
  ),
};

export const initDB = async () => {
  try {
    await connection.sequelize.authenticate();
    console.log("Connection has been established succesfully.");
  } catch (err) {
    console.log("Unable to connect to the database", err);
  }
};

export const initMigration = async () => {
  try {
    console.log("Starting migration.");

    const umzug = new Umzug({
      migrations: {
        glob: "migrations/*.js",
        resolve: ({ name, path, context }) => {
          // adjust the migration parameters Umzug will
          // pass to migration methods, this is done because
          // Sequilize-CLI generates migrations that require
          // two parameters be passed to the up and down methods
          // but by default Umzug will only pass the first
          const migration = require(path || "");
          return {
            name,
            up: async () => migration.up(context, Sequelize),
            down: async () => migration.down(context, Sequelize),
          };
        },
      },
      context: connection.sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize: connection.sequelize }),
      logger: console,
    });
    // Checks migrations and run them if they are not already applied. To keep
    // track of the executed migrations, a table (and sequelize model) called
    // SequelizeMeta will be automatically created (if it doesn't exist
    // already) and parsed.
    await umzug.up();
    console.log("Migration ran successfully.");
  } catch (err) {
    console.log(`Migration failed: ${err}`);
  }
};
