import { getDB } from "@/lib/db";

export const PackagesRepo = {
  getAll: async () => {
    const db = getDB();

    const [rows] = await db.query(
      "SELECT id, baslik, icerik, link_adi FROM paketler",
    );
    return rows;
  },
};
