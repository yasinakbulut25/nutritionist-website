import { getDB } from "@/lib/db";

export const SssRepo = {
  getAll: async () => {
    const db = getDB();
    const [rows] = await db.query(
      "SELECT id, soru, cevap FROM sss ORDER BY id ASC",
    );
    return rows;
  },
};
