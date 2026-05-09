import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, TrendingUp, Clock, BookOpen, Eye } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { BlogService } from "@/services/blogs.service";
import { BASE_URL } from "@/utils/constants";
import Container from "@/components/Container";

export async function generateMetadata({ params }) {
  const { category } = await params;
  try {
    const { category: cat } = await BlogService.getCategoryPage(category);
    return {
      title: `${cat.adi} | Diyetisyen Gizem Akbulut`,
      description: cat.aciklama,
    };
  } catch {
    return { title: "Kategori | Diyetisyen Gizem Akbulut" };
  }
}

function SidebarBlogItem({ post, rank }) {
  return (
    <Link
      href={`/yazilarim/${post.sef}`}
      className="flex items-start gap-3 group py-3 border-b border-slate-100 last:border-0"
    >
      <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-slate-100">
        <Image
          src={`${BASE_URL}${post.resim}`}
          alt={post.baslik}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {rank !== undefined && (
          <span className="absolute top-1 left-1 w-4 h-4 rounded-md bg-violet-600 text-white text-[9px] font-bold flex items-center justify-center">
            {rank}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 group-hover:text-violet-600 transition-colors line-clamp-2 leading-snug">
          {post.baslik}
        </p>
        <span className="inline-block mt-1.5 text-xs text-violet-500 font-medium bg-violet-50 px-2 py-0.5 rounded-full">
          {post.kategori_adi}
        </span>
      </div>
    </Link>
  );
}

export default async function KategoriPage({ params }) {
  const { category } = await params;

  let data;
  try {
    data = await BlogService.getCategoryPage(category);
  } catch {
    notFound();
  }

  const {
    category: cat,
    blogs,
    allCategories,
    recentBlogs,
    popularBlogs,
  } = data;

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-slate-50 border-b border-slate-100">
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl bg-violet-200/35 z-10" />
        <div className="pointer-events-none absolute -bottom-20 right-0 w-80 h-80 rounded-full blur-3xl bg-violet-100/50 z-10" />

        <Container className="!pt-36 !pb-12 relative z-20">
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-widest">
              Yazılarım
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              {cat.adi}
            </h1>
            {cat.aciklama && (
              <p className="text-slate-500 text-lg leading-relaxed">
                {cat.aciklama}
              </p>
            )}
            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {allCategories.map((c) => (
                <Link
                  key={c.sef}
                  href={`/kategoriler/${c.sef}`}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    c.sef === category
                      ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600"
                  }`}
                >
                  {c.adi}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            {blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                <BookOpen className="w-10 h-10 text-slate-300" />
                <p className="text-slate-500 font-medium">
                  Bu kategoride henüz yazı bulunmuyor.
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-slate-400 mb-5 font-medium">
                  {blogs.length} yazı bulundu
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {blogs.map((post) => (
                    <article
                      key={post.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-violet-200 hover:shadow-xl transition-all duration-300"
                    >
                      <Link
                        href={`/yazilarim/${post.sef}`}
                        className="block relative overflow-hidden aspect-[16/10]"
                      >
                        <Image
                          src={`${BASE_URL}${post.resim}`}
                          alt={post.baslik}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-violet-600 text-white text-xs font-semibold rounded-full">
                            {post.kategori_adi}
                          </span>
                        </div>
                      </Link>

                      <div className="p-5">
                        <Link href={`/yazilarim/${post.sef}`}>
                          <h2 className="text-base font-bold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors line-clamp-2 leading-snug">
                            {post.baslik}
                          </h2>
                        </Link>

                        <div
                          className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.icerik),
                          }}
                        />

                        <div className="flex items-center justify-between">
                          <Link
                            href={`/yazilarim/${post.sef}`}
                            className="inline-flex items-center gap-1.5 text-violet-600 font-semibold text-sm group-hover:gap-2.5 transition-all duration-200"
                          >
                            Devamını Oku
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Eye className="w-3.5 h-3.5" />
                            {post.hit.toLocaleString("tr-TR")}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-violet-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">
                  Son Yazılar
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                {recentBlogs.map((post) => (
                  <SidebarBlogItem key={post.id} post={post} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-violet-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">
                  Popüler Yazılar
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                {popularBlogs.map((post, i) => (
                  <SidebarBlogItem key={post.id} post={post} rank={i + 1} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
