import { getDB } from "@/lib/db";

export const CommentsRepo = {
  getAll: async () => {
    const db = getDB();

    const [rows] = await db.query(
      "SELECT id, ekleyen, icerik, sehir, tarih FROM gorusler WHERE onay = 1 ORDER BY id DESC",
    );
    return rows;
  },

  create: async ({ ekleyen, sehir, icerik }) => {
    const db = getDB();
    const tarih = new Date().toISOString().slice(0, 10);

    const [result] = await db.query(
      "INSERT INTO gorusler (ekleyen, icerik, sehir, tarih, onay) VALUES (?, ?, ?, ?, 1)",
      [ekleyen, icerik, sehir, tarih],
    );
    return result.insertId;
  },
};
