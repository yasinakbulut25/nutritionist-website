import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogService } from "@/services/blogs.service";
import Container from "@/components/Container";
import TitleWithDesc from "@/components/TitleWithDesc";
import BlogCard from "./BlogCard";

async function BlogsSection({ categorySef }) {
  if (!categorySef) return;

  const { category, blogs } = await BlogService.getByCategory(categorySef, 6);

  return (
    <Container>
      <TitleWithDesc
        title={category.adi}
        subTitle="Yazılılarım"
        desc={category.aciklama}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href={`/yazilar/${category.sef}`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/50"
        >
          Tüm Yazıları Görüntüle
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </Container>
  );
}

export default BlogsSection;
