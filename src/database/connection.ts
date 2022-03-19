import knex from "knex";
import dotenv from 'dotenv'

dotenv.config()

const db = knex({
  client: "pg",
  version: "7.2",
  connection: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: { rejectUnauthorized: false }

  },
});

export default db;
