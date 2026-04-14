import { BASE_URL } from "@/utils/constants";
import DOMPurify from "isomorphic-dompurify";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function BlogCard({ post }) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-violet-300 transition-all duration-300 hover:shadow-xl">
      <Link
        href={`/yazi/${post.sef}`}
        className="block relative overflow-hidden aspect-[16/10]"
      >
        <Image
          src={`${BASE_URL}${post.resim}`}
          alt={post.baslik}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-violet-600 text-white text-xs font-semibold rounded-full">
            {post.kategori_adi}
          </span>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/yazi/${post.sef}`}>
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition-colors line-clamp-2">
            {post.baslik}
          </h3>
        </Link>

        <div
          className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.icerik),
          }}
        />

        <Link
          href={`/yazi/${post.sef}`}
          className="inline-flex items-center gap-2 text-violet-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
        >
          Devamını Oku
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;
