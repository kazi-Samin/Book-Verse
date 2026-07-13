"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import api from "@/lib/axios";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsLoading(true);

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

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    api.post("/payments/create-payment-intent", { amount: 97.48, currency: "usd" })
      .then((res) => {
        if (res.data?.data?.clientSecret) {
          setClientSecret(res.data.data.clientSecret);
        } else {
          setErrorMsg("Could not fetch client secret. Invalid response from server.");
        }
      })
      .catch(err => {
        console.error("Could not fetch client secret", err);
        setErrorMsg(err.response?.data?.message || "Failed to initialize secure checkout. Please try again later.");
      });
  }, []);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#0f172a', // primary brand color
      colorBackground: '#ffffff',
      colorText: '#0f172a',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-12 min-h-[70vh]">
      <div className="max-w-2xl mx-auto bg-surface rounded-2xl p-8 border border-outline-variant shadow-sm">
        <h1 className="text-3xl font-bold text-on-background mb-8 text-center">Secure Checkout</h1>
        
        {errorMsg ? (
          <div className="p-6 bg-error/10 border border-error rounded-xl text-center">
            <h3 className="text-error font-bold mb-2">Checkout Error</h3>
            <p className="text-on-background font-medium mb-4">{errorMsg}</p>
            <p className="text-sm text-on-surface-variant">
              If this says "Stripe secret key is not configured", please ensure you have added STRIPE_SECRET_KEY to your backend Vercel environment variables.
            </p>
          </div>
        ) : clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
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
