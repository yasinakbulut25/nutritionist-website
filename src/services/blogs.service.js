import { BlogsRepo } from "@/repositories/blogs.repo";
import { CategoryRepo } from "@/repositories/category.repo";

export const BlogService = {
  getBlogDetail: async (sef) => {
    const [blog, recentBlogs, popularBlogs] = await Promise.all([
      BlogsRepo.getBySef(sef),
      BlogsRepo.getRecent(10),
      BlogsRepo.getPopular(10),
      CategoryRepo.getAll(),
    ]);

    if (!blog) throw new Error("Yazı bulunamadı");

    // increment hit count — non-blocking
    BlogsRepo.incrementHit(blog.id).catch(() => {});

    return { blog, recentBlogs, popularBlogs };
  },

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
