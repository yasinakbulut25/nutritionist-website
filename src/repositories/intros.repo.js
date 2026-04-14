import { getDB } from "@/lib/db";

export const IntrosRepo = {
  getAll: async () => {
    const db = getDB();

    const [rows] = await db.query(
      "SELECT id, baslik, icerik, link_adi FROM aciklamalar",
    );
    return rows;
  },
};
