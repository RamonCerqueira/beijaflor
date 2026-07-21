// import { prisma } from "@/lib/db";
import { mockNotices } from "@/lib/mockData";
import NoticesManagerClient from "@/components/NoticesManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminNoticesPage() {
  // BANCO SUPABASE PAUSADO - Consulta original comentada:
  // const notices = await prisma.notice.findMany({
  //   orderBy: { date: "desc" },
  // });
  const notices = mockNotices;

  return <NoticesManagerClient initialNotices={notices} />;
}
