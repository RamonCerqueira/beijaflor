import { prisma } from "@/lib/db";
import GalleryManagerClient from "@/components/GalleryManagerClient";

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const posts = await prisma.galleryPost.findMany({
    orderBy: {
      date: "desc",
    },
  });

  return <GalleryManagerClient initialPosts={posts} />;
}
