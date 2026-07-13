"use client";

import { useCart } from "@/hooks/useCart";
import { X, Minus, Plus, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotals } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { totalItems, totalPrice } = getTotals();

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setIsOpen(false);
    router.push('/checkout');
    setIsCheckingOut(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[450px] bg-surface shadow-2xl z-[101] flex flex-col transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) dark:border-l dark:border-outline-variant/30 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-outline-variant/40 bg-surface shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-inner">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-on-background">Your Cart</h2>
            <span className="bg-surface-container-high text-on-surface-variant text-xs font-bold px-2.5 py-1 rounded-full">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 bg-surface-container-low hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant hover:text-on-background shadow-sm border border-outline-variant/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-12 bg-surface-container-lowest/50 dark:bg-surface relative">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center mb-4 shadow-sm border border-outline-variant/30">
                <ShoppingCart className="w-10 h-10 text-outline-variant" />
              </div>
              <h3 className="text-xl font-bold text-on-background">Your cart is empty</h3>
              <p className="text-on-surface-variant text-sm max-w-[250px] leading-relaxed">
                Looks like you haven't added any books to your cart yet. Discover your next favorite read!
              </p>
              <Link
                href="/explore"
                onClick={() => setIsOpen(false)}
                className="mt-6 px-8 py-3 bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2"
              >
                Explore Library <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item._id} className="flex gap-5 p-4 rounded-2xl border border-outline-variant/40 hover:border-primary/50 transition-colors bg-surface dark:bg-surface-container-low shadow-sm group">
                  <div className="w-24 h-32 relative rounded-xl overflow-hidden shrink-0 shadow-md border border-black/10 dark:border-white/5">
                    <img 
                      src={item.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-1 py-1">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="font-bold text-on-background line-clamp-2 text-sm leading-tight pr-2">{item.title}</h4>
                      <button 
                        onClick={() => removeItem(item._id)}
                        className="text-on-surface-variant hover:text-error transition-colors p-1.5 hover:bg-error/10 rounded-md shrink-0"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-on-surface-variant font-medium mb-auto">{item.author}</span>
                    
                    <div className="flex items-end justify-between mt-4">
                      <span className="font-bold text-primary text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                      
                      <div className="flex items-center border border-outline-variant/60 rounded-xl bg-surface-container-lowest dark:bg-surface shadow-sm overflow-hidden h-9">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-9 h-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/10"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-on-background border-x border-outline-variant/30 h-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-9 h-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/10"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-outline-variant/40 p-6 bg-surface z-10 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm text-on-surface-variant font-medium">
                <span>Subtotal ({totalItems} items)</span>
                <span className="text-on-background">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-on-surface-variant font-medium">
                <span>Shipping Estimate</span>
                <span className="text-tertiary font-bold">FREE</span>
              </div>
              <div className="h-px w-full bg-outline-variant/40 my-1"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-on-background">Total</span>
                <span className="text-2xl font-black text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 mb-3 bg-surface-container-high text-on-background font-bold rounded-xl hover:bg-surface-container-highest transition-all shadow-sm flex items-center justify-center border border-outline-variant/50"
            >
              View Full Cart
            </Link>
            
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-primary/25 flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                "Checkout Securely"
              )}
            </button>
            <p className="text-center text-xs text-on-surface-variant mt-4 font-medium flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span> Secure, encrypted checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
