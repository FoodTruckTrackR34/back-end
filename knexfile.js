const pg = require('pg')

require("dotenv").config();

const localConnection = "postgresql://localhost/foodTruck1"

let connection

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
  connection = process.env.DATABASE_URL
} else {
  connection = localConnection
}

const sharedConfig = {
  client: 'pg',
  connection,
  migrations: { directory: './api/database/migrations' },
  seeds: { directory: './api/database/seeds' },
}

module.exports = {
  development: { ...sharedConfig },
  production: {
    ...sharedConfig,
    pool: { min: 2, max: 10},
  }
}

// const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/auth";
// // if using a local postgres server, please create the database manually, Knex will not create it autmatically

// module.exports = {
//   development: {
//     client: "sqlite3",
//     useNullAsDefault: true,
//     connection: {
//       filename: "./database/foodTruck.db3",
//     },
//     pool: {
//       afterCreate: (conn, done) => {
//         conn.run("PRAGMA foreign_keys = ON", done);
//       },
//     },
//     migrations: {
//       directory: "./database/migrations",
//     },
//     seeds: {
//       directory: "./database/seeds",
//     },
//   },

//   production: {
//     client: "pg",
//     connection: pgConnection,
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       directory: "./database/migrations",
//     },
//     seeds: {
//       directory: "./database/seeds",
//     },
//   },
// };
