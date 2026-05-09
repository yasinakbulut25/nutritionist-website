import { getDB } from "@/lib/db";

export const HakkimdaRepo = {
  getAll: async () => {
    const db = getDB();
    const [rows] = await db.query("SELECT id, baslik, icerik FROM hakkimda");
    return rows;
  },
};
