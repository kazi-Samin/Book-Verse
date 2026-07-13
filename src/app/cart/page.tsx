"use client";

import { useCart } from "@/hooks/useCart";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotals } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { totalItems, totalPrice } = getTotals();

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert("Redirecting to secure checkout...");
      setIsCheckingOut(false);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-500">
        <div className="w-32 h-32 bg-surface-container-low rounded-full flex items-center justify-center mb-6 shadow-sm border border-outline-variant/30">
          <ShoppingCart className="w-16 h-16 text-outline-variant" />
        </div>
        <h1 className="font-section-title text-4xl text-on-background mb-4">Your Cart is Empty</h1>
        <p className="text-on-surface-variant max-w-md mx-auto mb-8 text-lg">
          Looks like you haven't added any books to your cart yet. Discover your next favorite read in our vast collection.
        </p>
        <Link
          href="/explore"
          className="px-8 py-4 bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2 text-lg"
        >
          Explore Library <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-section-v-space min-h-[80vh]">
      <h1 className="font-section-title text-3xl md:text-4xl text-on-background mb-8 flex items-center gap-3">
        Shopping Cart
        <span className="bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full align-middle">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column - Cart Items */}
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => (
            <div 
              key={item._id} 
              className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border border-outline-variant/40 bg-surface shadow-sm group hover:border-primary/30 transition-all"
            >
              {/* Cover Image */}
              <Link href={`/book/${item._id}`} className="w-32 h-44 sm:w-40 sm:h-56 shrink-0 relative rounded-xl overflow-hidden shadow-md border border-black/10 dark:border-white/5 block">
                <img 
                  src={item.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              
              {/* Item Details */}
              <div className="flex flex-col flex-1 py-1">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <Link href={`/book/${item._id}`} className="hover:text-primary transition-colors">
                    <h3 className="font-card-title text-xl text-on-background leading-tight">{item.title}</h3>
                  </Link>
                  <span className="font-bold text-primary text-xl">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                
                <p className="text-on-surface-variant font-medium mb-1">{item.author}</p>
                <p className="text-sm text-tertiary mb-auto">In Stock</p>
                
                <div className="flex items-end justify-between mt-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-outline-variant/60 rounded-xl bg-surface-container-lowest dark:bg-surface-container-low shadow-sm overflow-hidden h-10">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-10 h-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/10"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-on-background border-x border-outline-variant/30 h-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-10 h-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/10"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeItem(item._id)}
                    className="flex items-center gap-2 text-on-surface-variant hover:text-error transition-colors px-3 py-2 rounded-lg hover:bg-error/10 text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 lg:p-8 sticky top-24 shadow-lg shadow-black/5 dark:shadow-white/5">
            <h2 className="font-card-title text-2xl text-on-background mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Subtotal ({totalItems} items)</span>
                <span className="text-on-background">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Shipping Estimate</span>
                <span className="text-tertiary font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Tax Estimate</span>
                <span className="text-on-background">$0.00</span>
              </div>
            </div>
            
            <div className="h-px w-full bg-outline-variant/40 my-6"></div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-on-background">Total</span>
              <span className="text-3xl font-black text-primary">${totalPrice.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-primary/25 flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed mb-4"
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
            
            <p className="text-center text-sm text-on-surface-variant font-medium flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px]">lock</span> 
              Secure, encrypted checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
