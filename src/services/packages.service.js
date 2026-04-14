import { PackagesRepo } from "@/repositories/packages.repo";

export const PackagesService = {
  getAll: async () => await PackagesRepo.getAll(),
};
