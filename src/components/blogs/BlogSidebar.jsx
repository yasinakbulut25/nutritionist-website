import Image from "next/image";
import Link from "next/link";
import { Clock, TrendingUp } from "lucide-react";
import { BASE_URL } from "@/utils/constants";

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

export default function BlogSidebar({ recentBlogs, popularBlogs }) {
  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-28">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
            <Clock className="w-4 h-4 text-violet-600" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Son Yazılar</h3>
        </div>
        <div>
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
          <h3 className="font-bold text-slate-800 text-sm">Popüler Yazılar</h3>
        </div>
        <div>
          {popularBlogs.map((post, i) => (
            <SidebarBlogItem key={post.id} post={post} rank={i + 1} />
          ))}
        </div>
      </div>
    </aside>
  );
}
