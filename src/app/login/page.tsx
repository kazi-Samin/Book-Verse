"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError("");
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
    });
    
    setIsLoading(false);
    
    if (error) {
      setError(error.message || "Failed to login");
    } else {
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="max-w-md mx-auto mt-section-v-space p-card-padding bg-surface rounded-xl border border-outline-variant whisper-shadow">
      <div className="text-center mb-8">
        <h1 className="font-section-title text-3xl font-bold text-on-background mb-2">Welcome Back</h1>
        <p className="font-body-main text-on-surface-variant">Log in to your BookVerse account</p>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-lg mb-6 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block font-label-caps text-label-caps text-on-background uppercase tracking-widest mb-2">
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-label-caps text-label-caps text-on-background uppercase tracking-widest mb-2">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-primary text-on-primary rounded-lg font-body-main font-semibold hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-6 flex items-center gap-4">
        <div className="h-px bg-outline-variant flex-grow"></div>
        <span className="font-caption text-on-surface-variant uppercase tracking-widest text-xs">Or continue with</span>
        <div className="h-px bg-outline-variant flex-grow"></div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full mt-6 py-4 bg-surface border border-outline-variant text-on-background rounded-lg font-body-main font-semibold hover:bg-surface-container-low transition-all active:scale-95 flex items-center justify-center gap-3"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.8 15.72 17.58V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
          <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.72 17.58C14.73 18.24 13.48 18.66 12 18.66C9.14 18.66 6.71 16.73 5.84 14.14H2.16V16.99C4.01 20.66 7.74 23 12 23Z" fill="#34A853"/>
          <path d="M5.84 14.14C5.62 13.48 5.49 12.76 5.49 12C5.49 11.24 5.62 10.52 5.84 9.86V7.01H2.16C1.4 8.52 0.96 10.21 0.96 12C0.96 13.79 1.4 15.48 2.16 16.99L5.84 14.14Z" fill="#FBBC05"/>
          <path d="M12 5.34C13.61 5.34 15.05 5.9 16.19 6.98L19.37 3.8C17.45 2.01 14.96 1 12 1C7.74 1 4.01 3.34 2.16 7.01L5.84 9.86C6.71 7.27 9.14 5.34 12 5.34Z" fill="#EA4335"/>
        </svg>
        Sign in with Google
      </button>

      <p className="font-caption text-center mt-8 text-on-surface-variant">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary hover:underline font-medium">
          Register here
        </Link>
      </p>
    </div>
  );
}
