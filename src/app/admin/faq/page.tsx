// import { prisma } from "@/lib/db";
import { mockFaqItems } from "@/lib/mockData";
import FaqManagerClient from "@/components/FaqManagerClient";

export const dynamic = "force-dynamic"; // Fresh content

export default async function AdminFaqPage() {
  // BANCO SUPABASE PAUSADO - Consulta original comentada:
  // const items = await prisma.faqItem.findMany({
  //   orderBy: { order: "asc" },
  // });
  const items = mockFaqItems;

  return <FaqManagerClient initialItems={items} />;
}
