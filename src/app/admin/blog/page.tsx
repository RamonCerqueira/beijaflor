// import { prisma } from "@/lib/db";
import { mockBlogPosts } from "@/lib/mockData";
import BlogManagerClient from "@/components/BlogManagerClient";

export const dynamic = "force-dynamic"; // Fresh content

export default async function AdminBlogPage() {
  // BANCO SUPABASE PAUSADO - Consulta original comentada:
  // const posts = await prisma.blogPost.findMany({
  //   orderBy: { date: "desc" },
  // });
  const posts = mockBlogPosts;

  return <BlogManagerClient initialPosts={posts} />;
}
