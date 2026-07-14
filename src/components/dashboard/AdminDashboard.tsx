"use client";

import { useSession } from "@/lib/auth-client";
import { useDashboardStats, useMonthlyStats } from "@/hooks/useDashboard";
import { Loader2, Library, Users, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: monthly, isLoading: monthlyLoading } = useMonthlyStats();

  if (statsLoading || monthlyLoading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-primary">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-body-main font-medium">Loading admin dashboard...</p>
      </div>
    );
  }

  if (!session) return null;

  const chartData = monthly?.data?.months.map((month, i) => ({
    name: month,
    sales: monthly.data?.sales[i] || 0,
  })) || [];

  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const fetchAllOrders = async () => {
    setLoadingData(true);
    try {
      const res = await axiosInstance.get("/orders/all");
      if (res.data) setOrders(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchAllUsers = async () => {
    setLoadingData(true);
    try {
      const res = await axiosInstance.get("/user/all");
      if (res.data) setUsers(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await axiosInstance.patch(`/orders/${orderId}/status`, { status });
      // Update local state
      setOrders(orders.map(o => (o._id === orderId || o.id === orderId) ? { ...o, status } : o));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  useEffect(() => {
    if (activeTab === "orders") fetchAllOrders();
    if (activeTab === "users") fetchAllUsers();
  }, [activeTab]);

  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-12">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-section-title text-4xl font-bold text-on-background mb-2">
            Welcome back, {session.user.name}
          </h1>
          <p className="font-body-main text-on-surface-variant">
            Here is what is happening with BookVerse today.
          </p>
        </div>
        <div className="flex bg-surface-container-low rounded-xl p-1 border border-outline-variant">
          <button onClick={() => setActiveTab("overview")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-background'}`}>Overview</button>
          <button onClick={() => setActiveTab("orders")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-background'}`}>All Orders</button>
          <button onClick={() => setActiveTab("users")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-background'}`}>All Users</button>
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          <div className="grid md:grid-cols-3 gap-gutter mb-12">
            <div className="bg-surface rounded-xl p-8 border border-outline-variant shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Library className="w-8 h-8" />
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1">Total Books</p>
                <h3 className="font-card-title text-3xl font-bold text-on-background">{stats?.data?.totalBooks || 0}</h3>
              </div>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-outline-variant shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1">Active Readers</p>
                <h3 className="font-card-title text-3xl font-bold text-on-background">{stats?.data?.totalUsers || 0}</h3>
              </div>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-outline-variant shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1">Total Orders</p>
                <h3 className="font-card-title text-3xl font-bold text-on-background">{stats?.data?.totalOrders || 0}</h3>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-8 border border-outline-variant shadow-sm">
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
        </>
      )}

      {activeTab === "orders" && (
        <div className="bg-surface rounded-xl p-8 border border-outline-variant shadow-sm animate-in fade-in duration-300">
          <h3 className="font-section-title text-2xl font-semibold text-on-background mb-6">Manage Orders</h3>
          {loadingData ? (
            <div className="py-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant text-on-surface-variant font-label-caps text-sm uppercase">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id || order.id} className="border-b border-outline-variant/50 hover:bg-surface-container-lowest transition-colors">
                      <td className="py-4 font-mono text-sm">{order.orderNumber || order._id || order.id}</td>
                      <td className="py-4 text-sm font-medium">{order.userEmail}</td>
                      <td className="py-4 text-sm text-on-surface-variant">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 font-bold">${order.totalAmount}</td>
                      <td className="py-4">
                        <select 
                          className="bg-surface-container text-sm border border-outline-variant rounded-lg px-2 py-1 outline-none focus:border-primary"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id || order.id, e.target.value)}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={5} className="py-8 text-center text-on-surface-variant">No orders found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "users" && (
        <div className="bg-surface rounded-xl p-8 border border-outline-variant shadow-sm animate-in fade-in duration-300">
          <h3 className="font-section-title text-2xl font-semibold text-on-background mb-6">Manage Users</h3>
          {loadingData ? (
            <div className="py-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant text-on-surface-variant font-label-caps text-sm uppercase">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Role</th>
                    <th className="pb-3 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id || u.id} className="border-b border-outline-variant/50 hover:bg-surface-container-lowest transition-colors">
                      <td className="py-4 font-medium">{u.name}</td>
                      <td className="py-4 text-sm text-on-surface-variant">{u.email}</td>
                      <td className="py-4"><span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md uppercase">{u.role || 'user'}</span></td>
                      <td className="py-4 text-sm text-on-surface-variant">{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan={4} className="py-8 text-center text-on-surface-variant">No users found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
