import { prisma } from "@/lib/db";
import VolunteerManagerClient from "@/components/VolunteerManagerClient";

export const dynamic = "force-dynamic"; // Fresh content

export default async function AdminVolunteersPage() {
  const candidates = await prisma.volunteerCandidate.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <VolunteerManagerClient initialCandidates={candidates} />;
}
