"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, User, Mail, Shield, Calendar } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-primary">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-body-main font-medium">Loading profile...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-3xl mx-auto px-margin-desktop py-12">
      <div className="mb-12">
        <h1 className="font-section-title text-4xl font-bold text-on-background mb-2">
          Your Profile
        </h1>
        <p className="font-body-main text-on-surface-variant">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="bg-surface rounded-xl p-8 border border-outline-variant whisper-shadow space-y-8">
        
        <div className="flex items-center gap-6 pb-8 border-b border-outline-variant">
          <div className="w-24 h-24 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed text-4xl font-bold uppercase">
            {session.user.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-section-title text-2xl font-semibold text-on-background">{session.user.name}</h2>
            <p className="font-body-main text-on-surface-variant">{session.user.email}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
              <User className="w-4 h-4" /> Full Name
            </label>
            <p className="font-body-main text-on-background font-medium px-4 py-3 bg-surface-container-low rounded-lg border border-outline-variant/50">
              {session.user.name}
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
              <Mail className="w-4 h-4" /> Email Address
            </label>
            <p className="font-body-main text-on-background font-medium px-4 py-3 bg-surface-container-low rounded-lg border border-outline-variant/50">
              {session.user.email}
            </p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
              <Shield className="w-4 h-4" /> Email Verified
            </label>
            <p className="font-body-main text-on-background font-medium px-4 py-3 bg-surface-container-low rounded-lg border border-outline-variant/50">
              {session.user.emailVerified ? "Yes" : "No"}
            </p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
              <Calendar className="w-4 h-4" /> Member Since
            </label>
            <p className="font-body-main text-on-background font-medium px-4 py-3 bg-surface-container-low rounded-lg border border-outline-variant/50">
              {new Date(session.user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant flex gap-4">
          <button className="px-6 py-3 bg-primary text-on-primary rounded-lg font-body-main font-semibold hover:opacity-90 transition-all active:scale-95">
            Edit Profile
          </button>
          <button className="px-6 py-3 border border-outline-variant text-on-background rounded-lg font-body-main font-semibold hover:bg-surface-container-low transition-all active:scale-95">
            Change Password
          </button>
        </div>

      </div>
    </div>
  );
}
