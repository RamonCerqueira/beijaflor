import { prisma } from "@/lib/db";
import NoticesManagerClient from "@/components/NoticesManagerClient";

export const revalidate = 0;

export default async function AdminNoticesPage() {
  const notices = await prisma.notice.findMany({
    orderBy: {
      date: "desc",
    },
  });

  return <NoticesManagerClient initialNotices={notices} />;
}
