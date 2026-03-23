import mysql2 from "mysql2"
import util from "util"

const pool = mysql2.createPool({
    host: "localhost",
    user: "lghost",
    password: "user",
    database: "pokemon",
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
})

pool.query = util.promisify(pool.query);

// pool.getConnection()
//   .then(conn => {
//     console.log("✅ Conexión a MariaDB exitosa");
//     conn.release();
//   })
//   .catch(err => {
//     console.error("❌ Error de conexión:", err.message);
//   });

export default pool;