import { prisma } from "@/lib/db";
import FinanceManagerClient from "./FinanceManagerClient";

export const revalidate = 0;

export default async function AdminFinancePage() {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const goals = await prisma.financialGoal.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <FinanceManagerClient
      initialTransactions={transactions}
      initialGoals={goals}
    />
  );
}
