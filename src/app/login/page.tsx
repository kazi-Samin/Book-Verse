"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff, ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const handleDemoLogin = () => {
    setValue("email", "kazisamin0173@gmail.com");
    setValue("password", "samin1234");
  };

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError("");
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
    });
    
    setIsLoading(false);
    
    if (error) {
      setError(error.message || "Failed to login. Please check your credentials.");
    } else {
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-surface">
      {/* Top Nav for Mobile/Tablet */}
      <div className="md:hidden flex items-center justify-between p-6 border-b border-outline-variant/30">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-card-title font-bold text-xl text-primary">BookVerse</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Left Panel - Branding */}
      <div className="hidden md:flex w-[45%] bg-surface-container-lowest border-r border-outline-variant/30 flex-col relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 p-12 lg:p-16 flex flex-col h-full">
          <div className="flex items-center justify-between mb-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="font-card-title font-bold text-2xl text-primary tracking-tight">BookVerse</span>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl lg:text-5xl font-bold text-on-background mb-6 leading-[1.15]">
              Discover Your Next <br/>
              <span className="text-primary">Favorite Book</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-md mb-12 leading-relaxed">
              Join thousands of readers exploring books across technology, business, fiction, history and more.
            </p>

            <div className="space-y-5 mb-16">
              {["Thousands of Books", "Personalized Recommendations", "Read Anywhere"].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-on-background">{feature}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-outline-variant/50">
              <div>
                <div className="text-2xl font-bold text-on-background">20K+</div>
                <div className="text-sm text-on-surface-variant font-medium">Books</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-on-background">5K+</div>
                <div className="text-sm text-on-surface-variant font-medium">Readers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-on-background">500+</div>
                <div className="text-sm text-on-surface-variant font-medium">Authors</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-[55%] flex flex-col bg-surface overflow-hidden">
        <div className="hidden md:flex justify-end p-6 sm:p-8 shrink-0">
          <div className="flex items-center gap-4 z-20">
            <Link href="/" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-full border border-outline-variant/50 shadow-sm hover:shadow-md">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <div className="bg-surface-container-lowest rounded-full border border-outline-variant/50 shadow-sm">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-start md:justify-center p-6 sm:px-12 pb-12 overflow-y-auto">
          <motion.div 
            className="w-full max-w-[460px] bg-surface rounded-2xl border border-outline-variant/50 p-8 sm:p-10 shadow-xl shadow-black/[0.03]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-on-background mb-2">Welcome back</h2>
              <p className="text-on-surface-variant">Log in to your account to continue</p>
            </div>

            {error && (
              <div className="bg-error/10 text-error p-4 rounded-xl mb-6 text-sm font-medium border border-error/20 flex items-start gap-3">
                <div className="mt-0.5"><CheckCircle2 className="w-4 h-4 rotate-45" /></div>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Demo Login Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 mb-2 bg-surface-container-high text-primary rounded-xl font-bold border border-primary/20 hover:bg-primary/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" /> Auto-fill Demo Credentials
              </button>

              <div>
                <label className="block text-sm font-semibold text-on-background mb-2">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  disabled={isLoading}
                  className="w-full px-4 py-3.5 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50 text-on-background placeholder:text-on-surface-variant/50"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-error text-sm mt-1.5 font-medium">{errors.email.message}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-on-background">
                    Password
                  </label>
                  <Link href="#" className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    disabled={isLoading}
                    className="w-full px-4 py-3.5 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50 text-on-background placeholder:text-on-surface-variant/50 pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-background transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-error text-sm mt-1.5 font-medium">{errors.password.message}</p>}
              </div>

              <div className="flex items-center gap-2 py-1">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                <label htmlFor="remember" className="text-sm font-medium text-on-surface-variant select-none">Remember me for 30 days</label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-primary/20"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log in"}
              </button>
            </form>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px bg-outline-variant flex-grow"></div>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Or continue with</span>
              <div className="h-px bg-outline-variant flex-grow"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full mt-8 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-sm disabled:opacity-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.8 15.72 17.58V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.72 17.58C14.73 18.24 13.48 18.66 12 18.66C9.14 18.66 6.71 16.73 5.84 14.14H2.16V16.99C4.01 20.66 7.74 23 12 23Z" fill="#34A853"/>
                <path d="M5.84 14.14C5.62 13.48 5.49 12.76 5.49 12C5.49 11.24 5.62 10.52 5.84 9.86V7.01H2.16C1.4 8.52 0.96 10.21 0.96 12C0.96 13.79 1.4 15.48 2.16 16.99L5.84 14.14Z" fill="#FBBC05"/>
                <path d="M12 5.34C13.61 5.34 15.05 5.9 16.19 6.98L19.37 3.8C17.45 2.01 14.96 1 12 1C7.74 1 4.01 3.34 2.16 7.01L5.84 9.86C6.71 7.27 9.14 5.34 12 5.34Z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

            <p className="text-center mt-8 text-sm font-medium text-on-surface-variant">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline font-bold">
                Create one now
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
