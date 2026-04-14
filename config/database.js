import mysql from "mysql2/promise";
import "dotenv/config";

const db = mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
    user: process.env.MYSQL_USER || "lghost",
    password: process.env.MYSQL_PASSWORD || "user",
    database: process.env.MYSQL_DATABASE || "pokemon",
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

export default db;