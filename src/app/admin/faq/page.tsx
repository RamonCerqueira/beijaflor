import { prisma } from "@/lib/db";
import FaqManagerClient from "@/components/FaqManagerClient";

export const dynamic = "force-dynamic"; // Fresh content

export default async function AdminFaqPage() {
  const items = await prisma.faqItem.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return <FaqManagerClient initialItems={items} />;
}
