import mysql from "mysql2/promise";

// Persist pool on global to survive Next.js HMR module re-evaluation in dev
const globalWithPool = global;

export function getDB() {
  if (!globalWithPool._mysqlPool) {
    globalWithPool._mysqlPool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return globalWithPool._mysqlPool;
}
