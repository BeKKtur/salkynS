import { Pool } from "pg";

export const pool = new Pool({
  database: "salkyndb",
  host: "localhost",
  port: 5432,
  password: "2104",
  user: "postgres",
});

pool.connect().then(() => {
  console.log("Connected to DB");
});
