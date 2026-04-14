import { getDB } from "@/lib/db";

export const CommentsRepo = {
  getAll: async () => {
    const db = getDB();

    const [rows] = await db.query(
      "SELECT id, ekleyen, icerik, sehir, tarih FROM gorusler WHERE onay = 1 ORDER BY id DESC",
    );
    return rows;
  },
};
