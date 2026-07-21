// import { prisma } from "@/lib/db";
import { mockTransactions, mockFinancialGoals } from "@/lib/mockData";
import FinanceManagerClient from "./FinanceManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminFinancePage() {
  // BANCO SUPABASE PAUSADO - Consultas originais comentadas:
  // const transactions = await prisma.transaction.findMany({
  //   orderBy: { date: "desc" },
  // });
  // const goals = await prisma.financialGoal.findMany({
  //   orderBy: { updatedAt: "desc" },
  // });

  const transactions = mockTransactions;
  const goals = mockFinancialGoals;

  return (
    <FinanceManagerClient
      initialTransactions={transactions}
      initialGoals={goals}
    />
  );
}
