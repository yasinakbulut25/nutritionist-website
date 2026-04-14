import { BlogsRepo } from "@/repositories/blogs.repo";
import { CategoryRepo } from "@/repositories/category.repo";

export const BlogService = {
  getByCategory: async (sef, limit) => {
    if (!sef) {
      throw new Error("Kategori gerekli");
    }

    const [category, blogs] = await Promise.all([
      CategoryRepo.getCategoryBySef(sef),
      BlogsRepo.getByCategory(sef, limit),
    ]);

    if (!category) {
      throw new Error("Kategori bulunamadı");
    }

    return {
      category,
      blogs,
    };
  },
};
