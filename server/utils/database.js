const mysql = require("mysql2");
require('dotenv').config();

const pool = process.env.NODE_ENV === "production"
  ? mysql.createPool(process.env.CLEARDB_DATABASE_URL) // Use ClearDB in production
  : mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'gens',
      waitForConnections: true,
      connectionLimit: 100,
      queueLimit: 0
    });

const runQuery = async () => {
    try {
        const connection = await pool.promise().getConnection();
        return connection;
    }
    catch (error) {
        console.error('Database access failure!\n', err);
        throw error;
    }
}

module.exports = runQuery;