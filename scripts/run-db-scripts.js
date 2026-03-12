const fs = require("fs")
const path = require("path")
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") })
const mysql = require("mysql2/promise")

async function main() {
  const host = process.env.DB_HOST
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  const database = process.env.DB_NAME
  const port = Number(process.env.DB_PORT || 3306)

  if (!host || !user || !database) {
    console.error("Missing DB env vars")
    process.exit(1)
  }

  const conn = await mysql.createConnection({
    host,
    user,
    password,
    port,
    multipleStatements: true,
  })

  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``)
  await conn.changeUser({ database })

  const order = ["user.sql", "sessions.sql", "appointment.sql", "seedSample.sql"]
  for (const file of order) {
    const p = path.join(process.cwd(), "db_scripts", file)
    if (!fs.existsSync(p)) continue
    const sql = fs.readFileSync(p, "utf8")
    try {
      await conn.query(sql)
      console.log("Executed", file)
    } catch (e) {
      console.warn("Skipped", file, String(e && e.message ? e.message : e))
    }
  }

  await conn.end()
  console.log("Database initialized")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
