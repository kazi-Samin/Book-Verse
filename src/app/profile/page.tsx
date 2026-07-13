"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Loader2, User, Mail, Shield, Calendar, Camera, X } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    } else if (session) {
      setName(session.user.name);
      setImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { error } = await authClient.updateUser({
        name,
        image
      });
      if (error) throw new Error(error.message);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      // Wait a moment for session to update, or reload
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { error } = await authClient.changePassword({
        newPassword,
        currentPassword,
        revokeOtherSessions: true
      });
      if (error) throw new Error(error.message);
      toast.success("Password changed successfully!");
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      toast.error(err.message || "Failed to change password");
    } finally {
      setIsSaving(false);
    }
  };

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
        
        <div className="flex items-center gap-6 pb-8 border-b border-outline-variant relative">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed text-4xl font-bold uppercase overflow-hidden border-2 border-outline-variant/50">
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
              ) : (
                session.user.name.charAt(0)
              )}
            </div>
          </div>
          <div>
            <h2 className="font-section-title text-2xl font-semibold text-on-background">{session.user.name}</h2>
            <p className="font-body-main text-on-surface-variant">{session.user.email}</p>
          </div>
        </div>

        {isEditing && (
          <form onSubmit={handleUpdateProfile} className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant mb-8 animate-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-on-background">Edit Profile</h3>
              <button type="button" onClick={() => {setIsEditing(false); setImage(session.user.image || ""); setName(session.user.name);}} className="text-on-surface-variant hover:text-on-background"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant flex items-center justify-center shrink-0 text-xl font-bold">
                     {image ? <img src={image} className="w-full h-full object-cover" /> : name.charAt(0).toUpperCase()}
                  </div>
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 border border-outline-variant rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-low transition-colors">
                    <Camera className="w-4 h-4" /> Change Picture
                  </button>
                  <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageChange} className="hidden" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full p-3 rounded-lg border border-outline-variant bg-surface" />
              </div>
            </div>

            <button type="submit" disabled={isSaving} className="px-6 py-3 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50">
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}

        {isChangingPassword && (
          <form onSubmit={handleChangePassword} className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant mb-8 animate-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-on-background">Change Password</h3>
              <button type="button" onClick={() => setIsChangingPassword(false)} className="text-on-surface-variant hover:text-on-background"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Current Password</label>
                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="w-full p-3 rounded-lg border border-outline-variant bg-surface" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">New Password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full p-3 rounded-lg border border-outline-variant bg-surface" />
              </div>
            </div>

            <button type="submit" disabled={isSaving} className="px-6 py-3 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50">
              {isSaving ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

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
          <button onClick={() => { setIsEditing(true); setIsChangingPassword(false); }} className="px-6 py-3 bg-primary text-on-primary rounded-lg font-body-main font-semibold hover:opacity-90 transition-all active:scale-95">
            Edit Profile
          </button>
          <button onClick={() => { setIsChangingPassword(true); setIsEditing(false); }} className="px-6 py-3 border border-outline-variant text-on-background rounded-lg font-body-main font-semibold hover:bg-surface-container-low transition-all active:scale-95">
            Change Password
          </button>
        </div>

      </div>
    </div>
  );
}
