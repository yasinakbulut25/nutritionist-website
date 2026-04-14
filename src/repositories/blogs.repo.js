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
};
