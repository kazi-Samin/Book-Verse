"use client";

import Link from "next/link";
import { Search, Loader2, BookOpen, Menu, X } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useState } from "react";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant w-full">
      <nav className="flex justify-between items-center px-margin-desktop w-full max-w-container-max mx-auto h-16">
        
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <BookOpen className="w-5 h-5 text-on-primary" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold text-on-background tracking-tight">BookVerse</span>
              <span className="text-[10px] text-on-surface-variant tracking-[0.15em] uppercase font-medium hidden sm:block">Online Bookstore</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-primary/8"
                    : "text-on-surface-variant hover:text-on-background hover:bg-surface-container-low"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <>
                <Link href="/dashboard" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/dashboard") ? "text-primary bg-primary/8" : "text-on-surface-variant hover:text-on-background hover:bg-surface-container-low"}`}>
                  Dashboard
                </Link>
                <Link href="/admin/books" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/admin") ? "text-primary bg-primary/8" : "text-on-surface-variant hover:text-on-background hover:bg-surface-container-low"}`}>
                  Manage
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1">
            <ThemeToggle />
          </div>

          <div className="hidden md:block w-px h-6 bg-outline-variant mx-2"></div>

          <div className="flex items-center gap-2">
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            ) : session ? (
              <>
                <Link href="/profile" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-surface-container-low transition-colors">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    {session.user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-on-background">{session.user.name.split(" ")[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-error rounded-md hover:bg-error/5 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-on-background rounded-md hover:bg-surface-container-low transition-colors">
                  Login
                </Link>
                <Link href="/register" className="px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity active:scale-95">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="lg:hidden p-2 rounded-md text-on-surface-variant hover:bg-surface-container-low transition-colors ml-1"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-outline-variant bg-surface px-margin-desktop py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-primary bg-primary/8"
                  : "text-on-surface-variant hover:text-on-background hover:bg-surface-container-low"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {session && (
            <>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-background hover:bg-surface-container-low transition-colors">Dashboard</Link>
              <Link href="/profile" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-background hover:bg-surface-container-low transition-colors">Profile</Link>
              <Link href="/admin/books" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-background hover:bg-surface-container-low transition-colors">Manage Books</Link>
            </>
          )}
          <div className="pt-2 border-t border-outline-variant mt-2 flex items-center justify-between px-4">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider font-medium">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
