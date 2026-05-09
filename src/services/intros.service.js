import { IntrosRepo } from "@/repositories/intros.repo";

export const IntrosService = {
  getInstagramIntro: async () => {
    const data = await IntrosRepo.getAll();
    return data[1];
  },

  getCommentsIntro: async () => {
    const data = await IntrosRepo.getAll();
    return data[2];
  },
};
