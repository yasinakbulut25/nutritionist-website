import { SssRepo } from "@/repositories/sss.repo";

export const SssService = {
  getAll: async () => await SssRepo.getAll(),
};
