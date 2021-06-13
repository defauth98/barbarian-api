import knex from "knex";

const db = knex({
  client: "pg",
  version: "7.2",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "docker",
    database: "barbarian",
  },
});

export default db;
