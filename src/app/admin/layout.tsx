import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { logoutAdminAction } from "@/lib/actions";
import { LogOut } from "lucide-react";
import AdminShell from "@/components/AdminShell";

export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  
  if (!session || !session.isAdmin) {
    redirect("/login");
  }

  const logoutButton = (
    <form action={logoutAdminAction}>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-red-950/45 hover:bg-red-900/50 text-red-400 border border-red-900/40 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer"
      >
        <LogOut size={14} />
        <span>Sair do Painel</span>
      </button>
    </form>
  );

  return (
    <AdminShell logoutButton={logoutButton}>
      {children}
    </AdminShell>
  );
}
