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

      <p className="font-caption text-center mt-6 text-on-surface-variant">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary hover:underline font-medium">
          Register here
        </Link>
      </p>
    </div>
  );
}
