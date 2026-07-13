"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { axiosInstance as api } from "@/lib/axios";
import { useCart } from "@/hooks/useCart";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear cart on successful payment
    if (paymentIntent) {
      clearCart();
      // You could optionally verify the payment intent status with your backend here
      // For now, we'll just clear the cart and show success
    }
    setLoading(false);
  }, [paymentIntent, clearCart]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-background">
      <div className="bg-surface p-8 md:p-12 rounded-3xl shadow-sm border border-outline-variant max-w-lg w-full text-center">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-on-background mb-4">Payment Successful!</h1>
        <p className="text-on-surface-variant mb-8 text-lg">
          Thank you for your purchase. Your order has been placed and is being processed.
        </p>

        <div className="bg-surface-container-low p-6 rounded-2xl mb-8 border border-outline-variant/50">
          <p className="text-sm text-on-surface-variant mb-2">Transaction Reference</p>
          <p className="font-mono text-sm text-on-background bg-background px-4 py-2 rounded-lg border border-outline-variant/30 break-all">
            {paymentIntent || "N/A"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Package className="w-5 h-5" />
            View Orders
          </Link>
          <Link
            href="/explore"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-surface text-on-surface font-bold rounded-xl border border-outline-variant hover:bg-surface-container transition-colors"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
