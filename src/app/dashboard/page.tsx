"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";

export default function DashboardPage() {
  const { data: session, isPending: sessionPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionPending && !session) {
      router.push("/login");
    }
  }, [session, sessionPending, router]);

  if (sessionPending) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-primary">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-body-main font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  if (!session) return null;

  const isAdmin = ["kazisamin0173@gmail.com", "starspanglefinance@gmail.com"].includes(session.user.email) || session.user.role === "admin";

  return isAdmin ? <AdminDashboard /> : <UserDashboard />;
}
