"use client";

import { useSession } from "@/lib/auth-client";
import { useDashboardStats, useMonthlyStats } from "@/hooks/useDashboard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Library, Users, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const { data: session, isPending: sessionPending } = useSession();
  const router = useRouter();

  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: monthly, isLoading: monthlyLoading } = useMonthlyStats();

  useEffect(() => {
    if (!sessionPending && !session) {
      router.push("/login");
    }
  }, [session, sessionPending, router]);

  if (sessionPending || statsLoading || monthlyLoading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-primary">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-body-main font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  if (!session) return null;

  const chartData = monthly?.data?.months.map((month, i) => ({
    name: month,
    sales: monthly.data?.sales[i] || 0,
  })) || [];

  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-12">
      <div className="mb-12">
        <h1 className="font-section-title text-4xl font-bold text-on-background mb-2">
          Welcome, {session.user.name}
        </h1>
        <p className="font-body-main text-on-surface-variant">
          Here is what is happening with BookVerse today.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-gutter mb-12">
        <div className="bg-surface rounded-xl p-8 border border-outline-variant whisper-shadow flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Library className="w-8 h-8" />
          </div>
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1">Total Books</p>
            <h3 className="font-card-title text-3xl font-bold text-on-background">{stats?.data?.totalBooks || 0}</h3>
          </div>
        </div>

        <div className="bg-surface rounded-xl p-8 border border-outline-variant whisper-shadow flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-secondary-fixed/30 flex items-center justify-center text-secondary">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1">Active Readers</p>
            <h3 className="font-card-title text-3xl font-bold text-on-background">{stats?.data?.activeReaders || 0}</h3>
          </div>
        </div>

        <div className="bg-surface rounded-xl p-8 border border-outline-variant whisper-shadow flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-tertiary-fixed/50 flex items-center justify-center text-tertiary">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1">Authors Joined</p>
            <h3 className="font-card-title text-3xl font-bold text-on-background">{stats?.data?.authorsJoined || 0}</h3>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-xl p-8 border border-outline-variant whisper-shadow">
        <h3 className="font-section-title text-2xl font-semibold text-on-background mb-8">Sales Overview</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c3c6d7" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#434655' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#434655' }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#004ac6', fontWeight: 600 }}
              />
              <Line type="monotone" dataKey="sales" stroke="#004ac6" strokeWidth={4} dot={{ r: 6, fill: '#004ac6' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
