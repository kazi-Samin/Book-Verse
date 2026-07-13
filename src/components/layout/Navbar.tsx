"use client";

import Link from "next/link";
import { Search, Moon, Sun, Loader2 } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant w-full">
      <nav className="flex justify-between items-center px-margin-desktop w-full max-w-container-max mx-auto h-20">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-section-title text-section-title font-bold text-primary">
            BookVerse
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="font-body-main text-body-main text-primary border-b-2 border-primary pb-1">
              Home
            </Link>
            <Link href="/explore" className="font-body-main text-body-main text-on-surface-variant hover:text-primary transition-colors">
              Explore
            </Link>
            <Link href="/categories" className="font-body-main text-body-main text-on-surface-variant hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/about" className="font-body-main text-body-main text-on-surface-variant hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="font-body-main text-body-main text-on-surface-variant hover:text-primary transition-colors">
              Contact
            </Link>
            {session && (
              <>
                <Link href="/dashboard" className="font-body-main text-body-main text-on-surface-variant hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/profile" className="font-body-main text-body-main text-on-surface-variant hover:text-primary transition-colors">
                  Profile
                </Link>
                <Link href="/admin/books" className="font-body-main text-body-main text-on-surface-variant hover:text-primary transition-colors">
                  Manage Books
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <Search className="w-6 h-6 text-on-surface-variant cursor-pointer hover:opacity-80 transition-opacity" />
            <Moon className="w-6 h-6 text-on-surface-variant cursor-pointer hover:opacity-80 transition-opacity" />
          </div>
          <div className="flex items-center gap-3">
            {isPending ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : session ? (
              <>
                <div className="hidden md:block text-sm font-medium text-on-surface-variant">
                  Hi, {session.user.name.split(" ")[0]}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 font-body-main text-on-surface-variant hover:text-error transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-6 py-2.5 font-body-main text-on-surface-variant hover:text-primary transition-colors inline-block">
                  Login
                </Link>
                <Link href="/register" className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-body-main font-medium hover:opacity-90 transition-opacity active:scale-95 duration-200 inline-block">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
