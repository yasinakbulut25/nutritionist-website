import { BlogsRepo } from "@/repositories/blogs.repo";
import { CategoryRepo } from "@/repositories/category.repo";

export const BlogService = {
  getCategoryPage: async (sef) => {
    const [category, blogs, allCategories, recentBlogs, popularBlogs] =
      await Promise.all([
        CategoryRepo.getCategoryBySef(sef),
        BlogsRepo.getByCategory(sef),
        CategoryRepo.getAll(),
        BlogsRepo.getRecent(10),
        BlogsRepo.getPopular(10),
      ]);

    if (!category) throw new Error("Kategori bulunamadı");

    return { category, blogs, allCategories, recentBlogs, popularBlogs };
  },

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
