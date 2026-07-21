// import { prisma } from "@/lib/db";
import { mockGalleryPosts } from "@/lib/mockData";
import GalleryManagerClient from "@/components/GalleryManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  // BANCO SUPABASE PAUSADO - Consulta original comentada:
  // const posts = await prisma.galleryPost.findMany({
  //   orderBy: { date: "desc" },
  // });
  const posts = mockGalleryPosts;

  return <GalleryManagerClient initialPosts={posts} />;
}
