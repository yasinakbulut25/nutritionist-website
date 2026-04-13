import { db } from "@/lib/db";

export const OnlineDiyetRepo = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM online_diyet");
    return rows;
  },
};
