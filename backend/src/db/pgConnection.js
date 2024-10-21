const { Client } = require("pg")

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "parking_system",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
})

async function invokePgConnection() {
  try {
    await client.connect()
    console.log("Connected to the PostgreSQL database successfully.")
  } catch (err) {
    console.error("Failed to connect to the PostgreSQL database:", err.message)
  }
}

module.exports = { invokePgConnection, client }
