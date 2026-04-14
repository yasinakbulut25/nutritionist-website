import { getDB } from "@/lib/db";

export const CategoryRepo = {
  getCategoryBySef: async (sef) => {
    const db = getDB();

    const [rows] = await db.query(
      `
    SELECT id, adi, sef, aciklama
    FROM kategoriler
    WHERE sef = ?
    LIMIT 1
  `,
      [sef],
    );

    return rows[0];
  },
};
