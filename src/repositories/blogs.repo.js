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
