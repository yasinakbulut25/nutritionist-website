import mysql from "mysql2/promise";

// On Vercel, Node.js processes are reused across warm invocations but
// discarded on cold starts. Storing the pool on `global` means a warm
// invocation reuses the same pool (and its open connections) instead of
// creating a new one — important for staying under cPanel's connection limit.
const globalWithPool = global;

export function getDB() {
  if (!globalWithPool._mysqlPool) {
    globalWithPool._mysqlPool = mysql.createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? "3306", 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      // ── Serverless-safe limits ──────────────────────────────────────────
      // cPanel shared hosting typically caps connections per user at 10–15.
      // Each Vercel function instance can hold at most `connectionLimit`
      // connections. Keep this at 2 so several concurrent Vercel invocations
      // don't exhaust the cPanel quota.
      connectionLimit: 2,
      waitForConnections: true,
      // If all connections are busy, queue new requests instead of failing.
      // 0 = unlimited queue length (requests wait their turn).
      queueLimit: 0,

      // ── Timeouts ───────────────────────────────────────────────────────
      // Without these, a refused or firewalled connection hangs until Vercel
      // kills the function (10 s on Hobby, 60 s on Pro) → silent 500.
      // connectTimeout: milliseconds to wait for the TCP handshake.
      connectTimeout: 10_000,
      // Enable TCP keep-alive so idle connections aren't silently dropped
      // by the hosting provider's firewall between requests.
      enableKeepAlive: true,
      keepAliveInitialDelay: 10_000,

      // ── Reliability ────────────────────────────────────────────────────
      // Stale pooled connections that were closed by the server are
      // automatically discarded and replaced.
      namedPlaceholders: false,
    });
  }

  return globalWithPool._mysqlPool;
}
