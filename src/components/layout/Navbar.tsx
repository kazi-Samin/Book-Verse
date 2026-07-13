"use client";

import Link from "next/link";
import { Loader2, Menu, X } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import CartSidebar from "@/components/ui/CartSidebar";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, getTotals } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const authLinks = [
    { href: "/dashboard", label: "Dashboard" },
    ...(session?.user?.role === "admin" ? [{ href: "/admin/books", label: "Manage" }] : []),
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-surface/90 backdrop-blur-xl sticky top-0 z-50 border-b border-outline-variant/60 w-full">
      <nav className="flex justify-between items-center px-margin-desktop w-full max-w-container-max mx-auto h-[72px]">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <rect width="32" height="32" rx="8" className="fill-primary"/>
            <path d="M8 9C8 8.44772 8.44772 8 9 8H14C14.5523 8 15 8.44772 15 9V23C15 23.5523 14.5523 24 14 24H9C8.44772 24 8 23.5523 8 23V9Z" fill="white" fillOpacity="0.9"/>
            <path d="M17 9C17 8.44772 17.4477 8 18 8H23C23.5523 8 24 8.44772 24 9V23C24 23.5523 23.5523 24 23 24H18C17.4477 24 17 23.5523 17 23V9Z" fill="white" fillOpacity="0.55"/>
          </svg>
          <span className="text-[22px] font-bold text-on-background tracking-tight leading-none">
            Book<span className="text-primary">Verse</span>
          </span>
        </Link>

        {/* Center Navigation */}
        <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-[14px] font-medium transition-colors rounded-md ${
                isActive(link.href)
                  ? "text-on-background"
                  : "text-on-surface-variant hover:text-on-background"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-primary rounded-full"></span>
              )}
            </Link>
          ))}
          {session && authLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-[14px] font-medium transition-colors rounded-md ${
                isActive(link.href)
                  ? "text-on-background"
                  : "text-on-surface-variant hover:text-on-background"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-primary rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-lg text-on-surface-variant hover:text-on-background hover:bg-surface-container-low transition-colors flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5" />
            {mounted && getTotals().totalItems > 0 && (
              <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {getTotals().totalItems}
              </span>
            )}
          </button>
          
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <div className="hidden md:block w-px h-5 bg-outline-variant/80 mx-1"></div>

          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          ) : session ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/profile" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-sm font-semibold">
                  {session.user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-on-background max-w-[100px] truncate">{session.user.name.split(" ")[0]}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-on-surface-variant hover:text-error transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-on-background transition-colors">
                Log in
              </Link>
              <Link href="/register" className="px-5 py-2.5 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:opacity-90 transition-all active:scale-[0.97]">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-background hover:bg-surface-container-low transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-outline-variant/60 bg-surface/95 backdrop-blur-xl">
          <div className="max-w-container-max mx-auto px-margin-desktop py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-primary/5"
                    : "text-on-surface-variant hover:text-on-background hover:bg-surface-container-low"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <>
                <div className="h-px bg-outline-variant/60 my-2"></div>
                {authLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium text-on-surface-variant hover:text-on-background hover:bg-surface-container-low transition-colors">
                    {link.label}
                  </Link>
                ))}
                <Link href="/profile" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium text-on-surface-variant hover:text-on-background hover:bg-surface-container-low transition-colors">
                  Profile
                </Link>
              </>
            )}
            <div className="h-px bg-outline-variant/60 my-2"></div>
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Appearance</span>
              <ThemeToggle />
            </div>
            {!session && (
              <div className="pt-2 flex gap-2 px-4">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2.5 border border-outline-variant rounded-lg text-sm font-medium text-on-background hover:bg-surface-container-low transition-colors">
                  Log in
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2.5 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      <CartSidebar />
    </header>
  );
}
