// import { prisma } from "@/lib/db";
import { mockVolunteerCandidates } from "@/lib/mockData";
import VolunteerManagerClient from "@/components/VolunteerManagerClient";

export const dynamic = "force-dynamic"; // Fresh content

export default async function AdminVolunteersPage() {
  // BANCO SUPABASE PAUSADO - Consulta original comentada:
  // const candidates = await prisma.volunteerCandidate.findMany({
  //   orderBy: { createdAt: "desc" },
  // });
  const candidates = mockVolunteerCandidates;

  return <VolunteerManagerClient initialCandidates={candidates} />;
}
