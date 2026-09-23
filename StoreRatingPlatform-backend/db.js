require("dotenv").config();
let mysql = require("mysql2/promise");
let conn = mysql.createPool({
  host: process.env.db_host,
  port: process.env.db_port,
  user: process.env.db_username,
  password: process.env.db_password,
  database: process.env.db_dbname,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Test DB connection
async function testDB() {
  try {
    const connection = await conn.getConnection();
    console.log("✅ MySQL Database connected successfully!");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
}

testDB();

module.exports = conn;
