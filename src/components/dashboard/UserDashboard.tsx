"use client";

import { Package, Heart, Settings, MapPin, CreditCard, ChevronRight, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const mockOrders = [
  { id: "ORD-9428", date: "Jul 10, 2026", status: "Delivered", total: "$56.98", items: 2 },
  { id: "ORD-8812", date: "Jun 24, 2026", status: "Processing", total: "$24.50", items: 1 },
  { id: "ORD-7391", date: "May 15, 2026", status: "Delivered", total: "$108.20", items: 4 },
];

export default function UserDashboard() {
  const { data: session } = useSession();
  
  if (!session) return null;

  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-12 min-h-[70vh]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface rounded-2xl p-6 border border-outline-variant shadow-sm text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-4 border-surface shadow-sm">
              {session.user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-on-background mb-1">{session.user.name}</h2>
            <p className="text-sm text-on-surface-variant font-medium">{session.user.email}</p>
            <div className="mt-4 inline-block px-3 py-1 bg-surface-container-high rounded-full text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Member
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <Link href="/dashboard" className="flex items-center gap-3 px-6 py-4 bg-primary/5 text-primary border-l-4 border-primary font-medium">
              <Package className="w-5 h-5" />
              My Orders
            </Link>
            <Link href="#" className="flex items-center gap-3 px-6 py-4 hover:bg-surface-container-lowest transition-colors text-on-surface-variant hover:text-on-background font-medium border-l-4 border-transparent">
              <Heart className="w-5 h-5" />
              Wishlist
            </Link>
            <Link href="#" className="flex items-center gap-3 px-6 py-4 hover:bg-surface-container-lowest transition-colors text-on-surface-variant hover:text-on-background font-medium border-l-4 border-transparent">
              <MapPin className="w-5 h-5" />
              Addresses
            </Link>
            <Link href="#" className="flex items-center gap-3 px-6 py-4 hover:bg-surface-container-lowest transition-colors text-on-surface-variant hover:text-on-background font-medium border-l-4 border-transparent">
              <CreditCard className="w-5 h-5" />
              Payment Methods
            </Link>
            <div className="h-px bg-outline-variant/50 w-full my-2" />
            <Link href="/profile" className="flex items-center gap-3 px-6 py-4 hover:bg-surface-container-lowest transition-colors text-on-surface-variant hover:text-on-background font-medium border-l-4 border-transparent">
              <Settings className="w-5 h-5" />
              Account Settings
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          
          <div className="bg-surface rounded-2xl p-8 border border-outline-variant shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-on-background">Recent Orders</h3>
                <p className="text-sm text-on-surface-variant mt-1">Check the status of your recent purchases</p>
              </div>
              <button className="text-primary text-sm font-semibold hover:underline">View All</button>
            </div>

            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 rounded-xl border border-outline-variant/60 hover:border-primary/40 transition-colors bg-surface-container-lowest/50 gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${order.status === 'Delivered' ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary'}`}>
                      {order.status === 'Delivered' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-on-background">{order.id}</h4>
                      <p className="text-sm text-on-surface-variant mt-0.5">{order.date} • {order.items} items</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    <div className="text-left sm:text-right">
                      <p className="font-bold text-on-background">{order.total}</p>
                      <p className={`text-xs font-bold uppercase tracking-wider mt-0.5 ${order.status === 'Delivered' ? 'text-secondary' : 'text-tertiary'}`}>
                        {order.status}
                      </p>
                    </div>
                    <button className="p-2 bg-surface-container hover:bg-surface-container-high rounded-lg transition-colors text-on-background">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant shadow-sm">
              <h4 className="font-bold text-lg text-on-background mb-2">Need help with an order?</h4>
              <p className="text-sm text-on-surface-variant mb-4">Our support team is available 24/7 to assist you with any questions or concerns.</p>
              <Link href="/contact" className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors text-sm">
                Contact Support
              </Link>
            </div>
            <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant shadow-sm">
              <h4 className="font-bold text-lg text-on-background mb-2">Personalize your feed</h4>
              <p className="text-sm text-on-surface-variant mb-4">Update your favorite genres and authors to get better book recommendations.</p>
              <Link href="/explore" className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors text-sm">
                Explore Genres
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
