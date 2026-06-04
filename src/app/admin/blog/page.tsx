import { prisma } from "@/lib/db";
import BlogManagerClient from "@/components/BlogManagerClient";

export const dynamic = "force-dynamic"; // Fresh content

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      date: "desc",
    },
  });

  return <BlogManagerClient initialPosts={posts} />;
}
