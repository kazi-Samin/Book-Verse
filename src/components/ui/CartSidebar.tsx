"use client";

import { useCart } from "@/hooks/useCart";
import { X, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotals } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { totalItems, totalPrice } = getTotals();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-surface shadow-2xl z-[101] flex flex-col transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-on-background">Your Cart</h2>
            <span className="bg-surface-container-high text-on-surface-variant text-xs font-bold px-2 py-1 rounded-full">
              {totalItems}
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-on-background"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-surface-container-lowest rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-outline-variant" />
              </div>
              <h3 className="text-lg font-bold text-on-background">Your cart is empty</h3>
              <p className="text-on-surface-variant text-sm max-w-[250px]">
                Looks like you haven't added any books to your cart yet.
              </p>
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-2.5 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary/20 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item._id} className="flex gap-4 p-4 rounded-xl border border-outline-variant hover:border-primary/30 transition-colors bg-surface-container-lowest shadow-sm">
                  <div className="w-20 h-28 relative rounded-md overflow-hidden shrink-0 shadow-sm border border-black/5">
                    <img 
                      src={item.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="font-bold text-on-background line-clamp-2 text-sm leading-tight">{item.title}</h4>
                      <button 
                        onClick={() => removeItem(item._id)}
                        className="text-on-surface-variant hover:text-error transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-on-surface-variant mb-auto">{item.author}</span>
                    
                    <div className="flex items-end justify-between mt-4">
                      <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                      
                      <div className="flex items-center border border-outline-variant rounded-lg bg-surface">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/5 rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-on-background">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/5 rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
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
          <div className="border-t border-outline-variant p-6 bg-surface-container-lowest">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-medium text-on-background">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>Shipping</span>
                <span className="text-tertiary font-medium">Free</span>
              </div>
              <div className="h-px w-full bg-outline-variant/60 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-on-background">Total</span>
                <span className="text-xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button 
              className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              onClick={() => {
                alert("Checkout functionality coming soon!");
              }}
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </>
  );
}
