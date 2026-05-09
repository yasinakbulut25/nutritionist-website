import { getDB } from "@/lib/db";

export const BlogsRepo = {
  getByCategory: async (kategoriSef, limit) => {
    const db = getDB();

    let query = `
    SELECT 
      y.id,
      y.baslik,
      y.icerik,
      y.resim,
      y.sef,
      y.hit,
      k.adi as kategori_adi,
      k.sef as kategori_sef
    FROM yazilar y
    LEFT JOIN kategoriler k ON y.kategori = k.id
    WHERE k.sef = ? AND y.onay = 1
    ORDER BY y.id DESC
  `;

    const params = [kategoriSef];

    if (limit && !isNaN(limit)) {
      query += " LIMIT ?";
      params.push(Number(limit));
    }

    const [rows] = await db.query(query, params);

    return rows;
  },

  getPrevNext: async (id, kategoriSef) => {
    const db = getDB();

    const [[prevRows], [nextRows]] = await Promise.all([
      db.query(
        `SELECT y.id, y.baslik, y.sef, y.resim, k.adi as kategori_adi, k.sef as kategori_sef
         FROM yazilar y LEFT JOIN kategoriler k ON y.kategori = k.id
         WHERE y.onay = 1 AND k.sef = ? AND y.id < ?
         ORDER BY y.id DESC LIMIT 1`,
        [kategoriSef, id],
      ),
      db.query(
        `SELECT y.id, y.baslik, y.sef, y.resim, k.adi as kategori_adi, k.sef as kategori_sef
         FROM yazilar y LEFT JOIN kategoriler k ON y.kategori = k.id
         WHERE y.onay = 1 AND k.sef = ? AND y.id > ?
         ORDER BY y.id ASC LIMIT 1`,
        [kategoriSef, id],
      ),
    ]);

    const prev = prevRows[0] || null;
    const next = nextRows[0] || null;

    // Fill missing slots with random blogs (different from current)
    const missing = [!prev, !next].filter(Boolean).length;
    let randoms = [];
    if (missing > 0) {
      const [randomRows] = await db.query(
        `SELECT y.id, y.baslik, y.sef, y.resim, k.adi as kategori_adi, k.sef as kategori_sef
         FROM yazilar y LEFT JOIN kategoriler k ON y.kategori = k.id
         WHERE y.onay = 1 AND y.id != ?
         ORDER BY RAND() LIMIT ?`,
        [id, missing],
      );
      randoms = randomRows;
    }

    let ri = 0;
    return {
      prev: prev || randoms[ri++] || null,
      next: next || randoms[ri++] || null,
    };
  },

  getBySef: async (sef) => {
    const db = getDB();
    const [rows] = await db.query(
      `SELECT y.id, y.baslik, y.icerik, y.tarih, y.resim, y.sef, y.ekleyen, y.hit,
              k.adi as kategori_adi, k.sef as kategori_sef
       FROM yazilar y
       LEFT JOIN kategoriler k ON y.kategori = k.id
       WHERE y.sef = ? AND y.onay = 1
       LIMIT 1`,
      [sef],
    );
    return rows[0] || null;
  },

  incrementHit: async (id) => {
    const db = getDB();
    await db.query("UPDATE yazilar SET hit = hit + 1 WHERE id = ?", [id]);
  },

  getRecent: async (limit = 10) => {
    const db = getDB();
    const [rows] = await db.query(
      `SELECT y.id, y.baslik, y.sef, y.resim, y.hit,
              k.adi as kategori_adi, k.sef as kategori_sef
       FROM yazilar y
       LEFT JOIN kategoriler k ON y.kategori = k.id
       WHERE y.onay = 1
       ORDER BY y.id DESC
       LIMIT ?`,
      [limit],
    );
    return rows;
  },

  search: async (query, limit = 8) => {
    const db = getDB();
    const [rows] = await db.query(
      `SELECT y.id, y.baslik, y.sef, y.resim,
              k.adi as kategori_adi, k.sef as kategori_sef
       FROM yazilar y
       LEFT JOIN kategoriler k ON y.kategori = k.id
       WHERE y.onay = 1 AND y.baslik LIKE ?
       ORDER BY y.id DESC
       LIMIT ?`,
      [`%${query}%`, limit],
    );
    return rows;
  },

  getPopular: async (limit = 10) => {
    const db = getDB();
    const [rows] = await db.query(
      `SELECT y.id, y.baslik, y.sef, y.resim, y.hit,
              k.adi as kategori_adi, k.sef as kategori_sef
       FROM yazilar y
       LEFT JOIN kategoriler k ON y.kategori = k.id
       WHERE y.onay = 1
       ORDER BY y.hit DESC
       LIMIT ?`,
      [limit],
    );
    return rows;
  },
};
