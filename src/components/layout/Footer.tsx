"use client";

import Link from "next/link";
import { Globe, Users, AtSign } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant w-full mt-section-v-space">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-gutter px-margin-desktop py-16 max-w-container-max mx-auto">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="font-card-title text-card-title font-bold text-primary mb-6 block">
            BookVerse
          </Link>
          <p className="font-caption text-caption text-on-surface-variant mb-6">
            Redefining the digital reading experience, one page at a time. Your sanctuary for stories.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary transition-all hover:border-primary">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary transition-all hover:border-primary">
              <Users className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary transition-all hover:border-primary">
              <AtSign className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-body-main font-bold text-primary mb-6">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link href="/explore" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Explore Books</Link></li>
            <li><Link href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Best Sellers</Link></li>
            <li><Link href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">New Arrivals</Link></li>
            <li><Link href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Our Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-body-main font-bold text-primary mb-6">Resources</h4>
          <ul className="space-y-4">
            <li><Link href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Author Portal</Link></li>
            <li><Link href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Publish With Us</Link></li>
            <li><Link href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Affiliate Program</Link></li>
            <li><Link href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Gift Cards</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-body-main font-bold text-primary mb-6">Support</h4>
          <ul className="space-y-4">
            <li><Link href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Help Center</Link></li>
            <li><Link href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Track Order</Link></li>
            <li><Link href="/contact" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Contact Us</Link></li>
            <li><Link href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Return Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-body-main font-bold text-primary mb-6">Legal</h4>
          <ul className="space-y-4">
            <li><Link href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Privacy Policy</Link></li>
            <li><Link href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Terms of Service</Link></li>
            <li><Link href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-all hover:underline">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-outline-variant py-8 px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-caption text-caption text-on-surface-variant">© 2024 BookVerse. All rights reserved.</p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 opacity-60">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Powered By</span>
            <span className="font-bold text-on-background">Stripe</span>
          </div>
          <div className="h-4 w-px bg-outline-variant"></div>
          <div className="flex gap-2">
            <div className="w-10 h-6 bg-surface border border-outline-variant rounded flex items-center justify-center text-[10px] font-bold text-[#1434CB]">VISA</div>
            <div className="w-10 h-6 bg-surface border border-outline-variant rounded flex items-center justify-center text-[10px] font-bold text-[#EB001B]">MC</div>
            <div className="w-10 h-6 bg-surface border border-outline-variant rounded flex items-center justify-center text-[10px] font-bold text-[#0070BA]">AMEX</div>
          </div>
        </div>

        <div className="flex gap-6">
          <span className="font-caption text-caption text-on-surface-variant flex items-center gap-2">
            English (US)
          </span>
          <span className="font-caption text-caption text-on-surface-variant flex items-center gap-2">
            USD
          </span>
        </div>
      </div>
    </footer>
  );
}
