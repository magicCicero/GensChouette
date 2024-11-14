const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gens',
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