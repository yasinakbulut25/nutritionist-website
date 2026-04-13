import { OnlineDiyetRepo } from "@/repositories/onlineDiyet.repo";

export const OnlineDiyetService = {
  getShortData: async () => {
    const data = await OnlineDiyetRepo.getAll();
    return data[0];
  },

  getLongData: async () => {
    const data = await OnlineDiyetRepo.getAll();
    return data[1];
  },
};
