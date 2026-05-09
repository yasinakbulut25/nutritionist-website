import { SITE_URL } from "@/lib/seo";
import { BlogsRepo } from "@/repositories/blogs.repo";
import { CategoryRepo } from "@/repositories/category.repo";

const staticRoutes = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/hakkimda", priority: 0.8, changeFrequency: "monthly" },
  { path: "/online-diyet", priority: 0.9, changeFrequency: "monthly" },
  { path: "/online-diyet-form", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gorusler", priority: 0.7, changeFrequency: "weekly" },
  { path: "/goruslerinizi-iletin", priority: 0.5, changeFrequency: "monthly" },
  { path: "/sikca-sorulan-sorular", priority: 0.7, changeFrequency: "monthly" },
  { path: "/iletisim", priority: 0.6, changeFrequency: "yearly" },
];

export default async function sitemap() {
  const now = new Date();

  const staticEntries = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  let blogEntries = [];
  let categoryEntries = [];

  try {
    const [blogs, categories] = await Promise.all([
      BlogsRepo.getRecent(200),
      CategoryRepo.getAll(),
    ]);

    blogEntries = blogs.map((post) => ({
      url: `${SITE_URL}/yazilarim/${post.sef}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    categoryEntries = categories.map((cat) => ({
      url: `${SITE_URL}/kategoriler/${cat.sef}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // DB unavailable at build time — only static routes
  }

  return [...staticEntries, ...categoryEntries, ...blogEntries];
}
