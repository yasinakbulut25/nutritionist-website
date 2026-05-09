import { NextResponse } from "next/server";
import { BlogsRepo } from "@/repositories/blogs.repo";
import { withErrorHandler } from "@/lib/api/handler";

export const GET = withErrorHandler(async (req) => {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results = await BlogsRepo.search(q);
  return NextResponse.json({ results });
});
