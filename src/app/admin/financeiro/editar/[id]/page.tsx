// import { prisma } from "@/lib/db";
import { mockTransactions } from "@/lib/mockData";
import { notFound } from "next/navigation";
import EditTransactionForm from "./EditTransactionForm";

interface EditarLancamentoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarLancamentoPage({ params }: EditarLancamentoPageProps) {
  const { id } = await params;
  
  // BANCO SUPABASE PAUSADO - Consulta original comentada:
  // const transaction = await prisma.transaction.findUnique({
  //   where: { id },
  // });
  const transaction = mockTransactions.find((t) => t.id === id) || mockTransactions[0];

  if (!transaction) {
    notFound();
  }

  // Convert dates and floats safely to plain objects for the client form
  const serializedTransaction = {
    id: transaction.id,
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    category: transaction.category,
    date: transaction.date.toISOString().split("T")[0],
  };

  return (
    <EditTransactionForm transaction={serializedTransaction} />
  );
}
