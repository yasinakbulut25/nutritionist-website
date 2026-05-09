import { CommentsRepo } from "@/repositories/comments.repo";

export const CommentsService = {
  getAll: async () => await CommentsRepo.getAll(),
  create: async (payload) => await CommentsRepo.create(payload),
};
