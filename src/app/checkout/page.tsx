"use client";

import { useState, useEffect, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2, ShoppingBag } from "lucide-react";
import { axiosInstance as api } from "@/lib/axios";
import { useCart } from "@/hooks/useCart";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

interface CheckoutItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  coverImage?: string;
  author?: string;
}

function CheckoutForm({ checkoutItems, totalPrice }: { checkoutItems: CheckoutItem[]; totalPrice: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsLoading(true);

    // Save pending order data to localStorage BEFORE Stripe redirects away
    const pendingOrder = {
      orderNumber: `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      items: checkoutItems.map((item) => ({
        bookId: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        coverImage: item.coverImage
      })),
      totalAmount: totalPrice,
      paymentMethod: 'Stripe',
      paymentStatus: 'Paid',
      shippingAddress: {
        fullName: "Customer",
        phone: "0123456789",
        streetAddress: "123 Main St",
        city: "Dhaka",
        state: "Dhaka",
        zipCode: "1200",
        country: "Bangladesh"
      }
    };
    localStorage.setItem('bookverse-pending-order', JSON.stringify(pendingOrder));

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="w-full px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span id="button-text">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message" className="text-error text-sm text-center font-medium mt-4">{message}</div>}
    </form>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const isDirect = searchParams.get("direct") === "true";
  const { items: cartItems, getTotals } = useCart();

  const [clientSecret, setClientSecret] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ready, setReady] = useState(false);

  // Determine items: direct-buy (single book) or from cart
  useEffect(() => {
    if (isDirect) {
      const directStr = localStorage.getItem('bookverse-direct-buy');
      if (directStr) {
        const directItem = JSON.parse(directStr);
        setCheckoutItems([directItem]);
        setTotalPrice(directItem.price * directItem.quantity);
        localStorage.removeItem('bookverse-direct-buy');
      }
    } else {
      setCheckoutItems(cartItems);
      const { totalPrice: tp } = getTotals();
      setTotalPrice(tp);
    }
    setReady(true);
  }, [isDirect, cartItems, getTotals]);

  // Create PaymentIntent when totalPrice is determined
  useEffect(() => {
    if (!ready || totalPrice <= 0) return;

    api.post("/payments/create-payment-intent", { amount: totalPrice, currency: "usd" })
      .then((res: any) => {
        if (res.data?.data?.clientSecret) {
          setClientSecret(res.data.data.clientSecret);
        } else {
          setErrorMsg("Could not fetch client secret. Invalid response from server.");
        }
      })
      .catch((err: any) => {
        console.error("Could not fetch client secret", err);
        setErrorMsg(err.response?.data?.message || "Failed to initialize secure checkout. Please try again later.");
      });
  }, [ready, totalPrice]);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#0f172a',
      colorBackground: '#ffffff',
      colorText: '#0f172a',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (!ready) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="max-w-container-max mx-auto px-margin-desktop py-12 min-h-[70vh]">
        <div className="max-w-2xl mx-auto bg-surface rounded-2xl p-12 border border-outline-variant shadow-sm text-center">
          <ShoppingBag className="w-16 h-16 text-on-surface-variant/40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-on-background mb-2">Your cart is empty</h2>
          <p className="text-on-surface-variant mb-6">Add some books to your cart before checking out.</p>
          <a href="/explore" className="inline-block px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors">
            Browse Books
          </a>
        </div>
      </div>
    );
  }

  const totalItems = checkoutItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-12 min-h-[70vh]">
      <div className="max-w-2xl mx-auto bg-surface rounded-2xl p-8 border border-outline-variant shadow-sm">
        <h1 className="text-3xl font-bold text-on-background mb-8 text-center">Secure Checkout</h1>
        
        {/* Order Summary */}
        <div className="mb-8 p-4 bg-surface-container-low rounded-xl border border-outline-variant/50">
          <h3 className="font-bold text-sm text-on-background mb-3">Order Summary</h3>
          <div className="space-y-2">
            {checkoutItems.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="text-on-surface-variant">{item.title} × {item.quantity}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-outline-variant/50 flex justify-between">
            <span className="font-bold">Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
            <span className="font-bold text-primary">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {errorMsg ? (
          <div className="p-6 bg-error/10 border border-error rounded-xl text-center">
            <h3 className="text-error font-bold mb-2">Checkout Error</h3>
            <p className="text-on-background font-medium mb-4">{errorMsg}</p>
            <p className="text-sm text-on-surface-variant">
              If this says &quot;Stripe secret key is not configured&quot;, please ensure you have added STRIPE_SECRET_KEY to your backend Vercel environment variables.
            </p>
          </div>
        ) : clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm checkoutItems={checkoutItems} totalPrice={totalPrice} />
          </Elements>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-on-surface-variant font-medium">Preparing secure checkout...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
