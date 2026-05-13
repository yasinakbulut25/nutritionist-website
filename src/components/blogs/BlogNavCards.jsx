import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BlogImage from "@/components/BlogImage";

function NavCard({ post, direction }) {
  const isPrev = direction === "prev";

  return (
    <Link
      href={`/yazilarim/${post.sef}`}
      className="group relative flex items-center gap-4 bg-white rounded-2xl border border-slate-100 p-4 overflow-hidden hover:border-violet-200 hover:shadow-lg transition-all duration-300 flex-1 min-w-0"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <BlogImage
          resim={post.resim}
          alt=""
          fill
          className="object-cover blur-2xl scale-110 opacity-10"
        />
      </div>

      <div
        className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-slate-100 ${
          isPrev ? "order-first" : "order-last"
        }`}
      >
        <BlogImage
          resim={post.resim}
          alt={post.baslik}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div
        className={`relative flex-1 min-w-0 flex flex-col gap-1 ${isPrev ? "items-start" : "items-end"}`}
      >
        <span className="flex items-center gap-1 text-xs font-semibold text-violet-500 uppercase tracking-wide">
          {isPrev ? (
            <>
              <ArrowLeft className="w-3 h-3" />
              Önceki Yazı
            </>
          ) : (
            <>
              Sonraki Yazı
              <ArrowRight className="w-3 h-3" />
            </>
          )}
        </span>
        <span className="inline-block px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 text-[11px] font-medium">
          {post.kategori_adi}
        </span>
        <p
          className={`text-sm font-bold text-slate-800 group-hover:text-violet-700 transition-colors line-clamp-2 leading-snug ${isPrev ? "text-left" : "text-right"}`}
        >
          {post.baslik}
        </p>
      </div>
    </Link>
  );
}

export default function BlogNavCards({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Diğer Yazılar
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {prev ? (
          <NavCard post={prev} direction="prev" />
        ) : (
          <div className="flex-1" />
        )}
        {next && <NavCard post={next} direction="next" />}
      </div>
    </div>
  );
}
