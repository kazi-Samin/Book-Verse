"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError("");
    const { error } = await signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });
    
    setIsLoading(false);
    
    if (error) {
      setError(error.message || "Failed to register");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-section-v-space p-card-padding bg-surface rounded-xl border border-outline-variant whisper-shadow">
      <div className="text-center mb-8">
        <h1 className="font-section-title text-3xl font-bold text-on-background mb-2">Create Account</h1>
        <p className="font-body-main text-on-surface-variant">Join BookVerse to explore our library</p>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-lg mb-6 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block font-label-caps text-label-caps text-on-background uppercase tracking-widest mb-2">
            Full Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
        </div>

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
          {isLoading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="font-caption text-center mt-6 text-on-surface-variant">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}
