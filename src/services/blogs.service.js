import { BlogsRepo } from "@/repositories/blogs.repo";
import { CategoryRepo } from "@/repositories/category.repo";

export const BlogService = {
  getBlogDetail: async (sef) => {
    // Fetch the main blog row first — if it doesn't exist we stop here and
    // avoid wasting connections on sidebar queries for a 404 page.
    const blog = await BlogsRepo.getBySef(sef);
    if (!blog) throw new Error("Yazı bulunamadı");

    // Split into two groups of 2 instead of one group of 3.
    // cPanel shared hosting caps total connections per user (often 10–15).
    // Running 3 queries in parallel per request means ~3 connections per
    // Vercel invocation; multiple concurrent visitors exhaust that limit fast.
    // Two sequential pairs keep the peak at 2 connections per request.
    const [recentBlogs, popularBlogs] = await Promise.all([
      BlogsRepo.getRecent(10),
      BlogsRepo.getPopular(10),
    ]);

    const prevNext = await BlogsRepo.getPrevNext(blog.id, blog.kategori_sef);

    // Fire-and-forget — do not await, do not let a failure here crash the page.
    BlogsRepo.incrementHit(blog.id).catch(() => {});

    return { blog, recentBlogs, popularBlogs, ...prevNext };
  },

  getCategoryPage: async (sef) => {
    // Validate the category exists before fetching expensive sidebar data.
    const category = await CategoryRepo.getCategoryBySef(sef);
    if (!category) throw new Error("Kategori bulunamadı");

    // Group 1: content queries (need the validated category slug).
    const [blogs, allCategories] = await Promise.all([
      BlogsRepo.getByCategory(sef),
      CategoryRepo.getAll(),
    ]);

    // Group 2: sidebar queries (independent, but kept separate to limit
    // peak connection count on shared hosting).
    const [recentBlogs, popularBlogs] = await Promise.all([
      BlogsRepo.getRecent(10),
      BlogsRepo.getPopular(10),
    ]);

    return { category, blogs, allCategories, recentBlogs, popularBlogs };
  },

  getByCategory: async (sef, limit) => {
    if (!sef) throw new Error("Kategori gerekli");

    const [category, blogs] = await Promise.all([
      CategoryRepo.getCategoryBySef(sef),
      BlogsRepo.getByCategory(sef, limit),
    ]);

    if (!category) throw new Error("Kategori bulunamadı");

    return { category, blogs };
  },
};
