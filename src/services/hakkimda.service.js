import { HakkimdaRepo } from "@/repositories/hakkimda.repo";

export const HakkimdaService = {
  getAll: async () => {
    const rows = await HakkimdaRepo.getAll();
    return {
      bio: rows.find((r) => r.id === 1),
      sertifikalar: rows.find((r) => r.id === 2),
    };
  },
};
