// const { Pool } = require("pg")
// require("dotenv").config()

// const pool = new Pool(
//   {
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT
//   }
// );
// module.exports = {
//   query: (text,params) => pool.query(text, params)
// }


const { Pool } = require("pg")
require("dotenv").config()

const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl:isProduction ? true : false
})

module.exports = {
  query: (text,params) => pool.query(text, params)
}