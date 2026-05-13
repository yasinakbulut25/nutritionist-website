import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Eye, Tag } from "lucide-react";
import SafeHtml from "@/components/SafeHtml";
import { BlogService } from "@/services/blogs.service";
import { resolveBlogImageUrl, SITE_NAME, SITE_URL, AUTHOR_NAME } from "@/lib/seo";
import BlogImage from "@/components/BlogImage";
import Container from "@/components/Container";
import BlogSidebar from "@/components/blogs/BlogSidebar";
import BlogNavCards from "@/components/blogs/BlogNavCards";

export async function generateMetadata({ params }) {
  const { sef } = await params;
  try {
    const { blog } = await BlogService.getBlogMeta(sef);
    const desc = blog.icerik
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 155);
    const ogImage = await resolveBlogImageUrl(blog.resim);
    const pageUrl = `${SITE_URL}/yazilarim/${sef}`;
    const title = `${blog.baslik} | ${SITE_NAME}`;
    const ogImageEntry = ogImage
      ? [{ url: ogImage, width: 1200, height: 630, alt: blog.baslik }]
      : undefined;

    return {
      title,
      description: desc,
      keywords: [blog.baslik, blog.kategori_adi, "beslenme", "diyet", AUTHOR_NAME],
      alternates: { canonical: pageUrl },
      openGraph: {
        type: "article",
        locale: "tr_TR",
        siteName: SITE_NAME,
        title: blog.baslik,
        description: desc,
        url: pageUrl,
        images: ogImageEntry,
        publishedTime: blog.tarih,
        modifiedTime: blog.tarih,
        authors: [AUTHOR_NAME],
        section: blog.kategori_adi,
        tags: [blog.kategori_adi, "beslenme", "diyet"],
      },
      twitter: {
        card: "summary_large_image",
        site: "@dyt.gizemakbulut",
        creator: "@dyt.gizemakbulut",
        title: blog.baslik,
        description: desc,
        images: ogImage ? [ogImage] : undefined,
      },
    };
  } catch {
    return { title: `Yazı | ${SITE_NAME}` };
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogDetailPage({ params }) {
  const { sef } = await params;

  let data;
  try {
    data = await BlogService.getBlogDetail(sef);
  } catch {
    notFound();
  }

  const { blog, recentBlogs, popularBlogs, prev, next } = data;

  const resolvedImage = await resolveBlogImageUrl(blog.resim);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/yazilarim/${sef}`,
    headline: blog.baslik,
    description: blog.icerik
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 155),
    image: resolvedImage ?? `${SITE_URL}/main.png`,
    datePublished: blog.tarih,
    dateModified: blog.tarih,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: `${SITE_URL}/hakkimda`,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/yazilarim/${sef}`,
    articleSection: blog.kategori_adi,
    inLanguage: "tr-TR",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: blog.kategori_adi,
        item: `${SITE_URL}/kategoriler/${blog.kategori_sef}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.baslik,
        item: `${SITE_URL}/yazilarim/${sef}`,
      },
    ],
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="relative w-full h-72 md:h-[350px] lg:h-[450px] bg-slate-200 overflow-hidden">
        <BlogImage
          resim={blog.resim}
          alt={blog.baslik}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 pb-8">
          <span className="inline-block mb-3 px-3 py-1 bg-violet-600 text-white text-xs font-semibold rounded-full">
            {blog.kategori_adi}
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-3xl">
            {blog.baslik}
          </h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Container>
            <div className="flex flex-wrap items-center gap-4 py-4 border-b border-slate-200">
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <User className="w-4 h-4 text-violet-400" />
                {blog.ekleyen}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <Calendar className="w-4 h-4 text-violet-400" />
                {formatDate(blog.tarih)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <Eye className="w-4 h-4 text-violet-400" />
                {blog.hit.toLocaleString("tr-TR")} görüntülenme
              </span>
              <Link
                href={`/kategoriler/${blog.kategori_sef}`}
                className="flex items-center gap-1.5 text-sm text-violet-600 font-medium hover:text-violet-800 transition-colors"
              >
                <Tag className="w-4 h-4" />
                {blog.kategori_adi}
              </Link>
            </div>
          </Container>

          <Container className="xl:!px-4 !px-0 !py-0">
            <div className="bg-white xl:rounded-2xl border border-slate-100 shadow-sm sm:p-6 md:p-10 py-6 px-4">
              <SafeHtml
                html={blog.icerik}
                className="online-diet-desc blog-content text-slate-700 leading-relaxed
                  [&_p]:mb-4 [&_p]:leading-relaxed
                  [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-3
                  [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-6 [&_h3]:mb-2
                  [&_ul]:my-4 [&_ul]:pl-1 [&_ol]:my-4 [&_ol]:pl-1
                  [&_li]:py-0.5
                  [&_strong]:font-semibold [&_strong]:text-slate-900
                  [&_a]:text-violet-600 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-violet-800
                  [&_img]:rounded-xl [&_img]:my-6 [&_img]:mx-auto
                  [&_blockquote]:border-l-4 [&_blockquote]:border-violet-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_blockquote]:my-6"
              />
            </div>
          </Container>

          <Container>
            <BlogNavCards prev={prev} next={next} />

            <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
              <Link
                href={`/kategoriler/${blog.kategori_sef}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-violet-200 bg-violet-50 text-violet-700 text-sm font-semibold hover:bg-violet-100 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                {blog.kategori_adi} yazılarına dön
              </Link>
            </div>
          </Container>
        </div>

        <Container>
          <BlogSidebar recentBlogs={recentBlogs} popularBlogs={popularBlogs} />
        </Container>
      </div>
    </main>
  );
}
