import path from "path";
const { FsMigrations } = require('knex/lib/migrate/sources/fs-migrations')

module.exports = {
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "docker",
    database: "barbarian",
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  useNullAsDefault: true,
};
