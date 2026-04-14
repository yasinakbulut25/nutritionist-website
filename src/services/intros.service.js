import { IntrosRepo } from "@/repositories/intros.repo";

export const IntrosService = {
  getCommentsIntro: async () => {
    const data = await IntrosRepo.getAll();
    return data[2];
  },
};
