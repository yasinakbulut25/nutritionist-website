import { getDB } from "@/lib/db";

export const OnlineDiyetRepo = {
  getAll: async () => {
    const db = getDB();

    const [rows] = await db.query("SELECT icerik FROM online_diyet");
    return rows;
  },
};
