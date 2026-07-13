"use client";

import Link from "next/link";
import { ChevronRight, ArrowRight, BookOpen, Users, Star, Award, Code, Monitor, Briefcase, History, Sparkles, Rocket, Search, Heart, User, Sun, Smile, Book, Compass, Library } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
  hidden: { opacity: 0 }
};

const categories = [
  { name: "Programming", icon: Code, desc: "Master software architecture", count: "1.2k", color: "from-blue-500 to-cyan-400" },
  { name: "Technology", icon: Monitor, desc: "Explore the latest tech trends", count: "845", color: "from-indigo-500 to-purple-400" },
  { name: "Business", icon: Briefcase, desc: "Insights on entrepreneurship", count: "2.1k", color: "from-emerald-500 to-teal-400" },
  { name: "History", icon: History, desc: "Events that shaped our world", count: "3.4k", color: "from-amber-500 to-orange-400" },
  { name: "Fantasy", icon: Sparkles, desc: "Epic tales of magic & dragons", count: "4.1k", color: "from-purple-500 to-pink-400" },
  { name: "Sci-Fi", icon: Rocket, desc: "Journey through futuristic worlds", count: "2.8k", color: "from-cyan-500 to-blue-400" },
  { name: "Mystery", icon: Search, desc: "Thrilling suspenseful page-turners", count: "3.7k", color: "from-gray-600 to-slate-400" },
  { name: "Romance", icon: Heart, desc: "Captivating stories of passion", count: "5.2k", color: "from-rose-500 to-pink-400" },
  { name: "Biography", icon: User, desc: "True stories of remarkable people", count: "1.8k", color: "from-orange-500 to-amber-400" },
  { name: "Self Growth", icon: Sun, desc: "Transform your life and habits", count: "2.9k", color: "from-yellow-500 to-amber-400" },
  { name: "Children's", icon: Smile, desc: "Stories to spark imagination", count: "1.5k", color: "from-pink-500 to-rose-400" },
  { name: "Classics", icon: Book, desc: "Masterpieces across generations", count: "4.6k", color: "from-stone-600 to-stone-400" },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      
      {/* Absolute Ambient Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/10 via-background/5 to-background pointer-events-none -z-10" />
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-20 pb-16 relative z-10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-on-surface-variant/80 mb-10 font-medium tracking-wide">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Compass className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-on-background bg-surface-container px-3 py-1 rounded-full shadow-sm border border-outline-variant/30">Categories</span>
          </div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]">
              <Sparkles className="w-4 h-4" /> Discover Your Next Obsession
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-black text-on-background mb-6 leading-[1.1] tracking-tight">
              Explore A Universe Of <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary animate-gradient-x">
                Captivating Genres
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-xl md:text-2xl text-on-surface-variant leading-relaxed max-w-2xl font-light">
              Dive into our meticulously curated collections. Whether you crave heart-pounding thrillers, sweeping fantasies, or cutting-edge tech guides.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Featured Collections */}
      <section className="max-w-container-max mx-auto px-margin-desktop mb-32 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {/* Main Large Card */}
          <motion.div variants={fadeUp} custom={0} className="md:col-span-2 md:row-span-2 group relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop" alt="Fiction Collection" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wider">Featured</span>
              <h2 className="text-4xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">Literary Fiction</h2>
              <p className="text-white/80 text-lg mb-6 max-w-md">Award-winning novels that explore the depths of the human experience.</p>
              <Link href="/explore?category=Fiction" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-xl font-medium transition-all group/btn">
                Explore Collection <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Medium Card 1 */}
          <motion.div variants={fadeUp} custom={1} className="md:col-span-2 lg:col-span-1 group relative rounded-3xl overflow-hidden shadow-xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
            <img src="https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=600&auto=format&fit=crop" alt="Sci-Fi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-2xl font-bold text-white mb-1">Sci-Fi & Fantasy</h3>
              <p className="text-white/70 text-sm mb-4">Journey beyond reality</p>
              <Link href="/explore?category=Sci-Fi" className="text-primary-300 hover:text-white font-medium inline-flex items-center gap-1 text-sm transition-colors">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>

          {/* Medium Card 2 */}
          <motion.div variants={fadeUp} custom={2} className="md:col-span-1 group relative rounded-3xl overflow-hidden shadow-xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
            <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop" alt="Mystery" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-2xl font-bold text-white mb-1">Mystery & Crime</h3>
              <p className="text-white/70 text-sm mb-4">Unravel the truth</p>
              <Link href="/explore?category=Mystery" className="text-primary-300 hover:text-white font-medium inline-flex items-center gap-1 text-sm transition-colors">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>

          {/* Wide Card */}
          <motion.div variants={fadeUp} custom={3} className="md:col-span-3 lg:col-span-2 group relative rounded-3xl overflow-hidden shadow-xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
            <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop" alt="History" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
            <div className="absolute bottom-0 left-0 p-8 z-20 h-full flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-white mb-2">History & Biography</h3>
              <p className="text-white/80 text-base mb-6 max-w-xs">Stories of the past that shape our future.</p>
              <Link href="/explore?category=History" className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg font-bold hover:bg-gray-200 transition-colors w-max">
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Comprehensive Category Grid */}
      <section className="bg-surface-container-lowest py-32 border-y border-outline-variant/30 relative">
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-on-background mb-4">All Categories</h2>
              <p className="text-on-surface-variant text-lg">Browse our extensive library by your favorite genre.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Link href="/explore" className="inline-flex items-center gap-2 text-primary font-bold hover:bg-primary/10 px-6 py-3 rounded-xl transition-colors">
                View All Books <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {categories.map((category, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <Link href={`/explore?category=${encodeURIComponent(category.name)}`} className="group flex flex-col bg-surface hover:bg-surface-container-low rounded-3xl p-6 border border-outline-variant/50 hover:border-primary/50 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 h-full relative overflow-hidden">
                  
                  {/* Hover Glow Effect */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${category.color} rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${category.color} text-white shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                    <category.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-on-background mb-3 group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-base text-on-surface-variant mb-6 flex-grow leading-relaxed">{category.desc}</p>
                  
                  <div className="flex items-center justify-between pt-5 border-t border-outline-variant/40 mt-auto">
                    <span className="bg-surface-container-high text-on-surface px-3 py-1 rounded-md text-sm font-bold tracking-wide">
                      {category.count}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner with Glassmorphism */}
      <section className="py-32 relative">
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <motion.div 
            className="rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl bg-on-background"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-purple-600/80 to-secondary/80" />
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mb-8 border border-white/30 shadow-xl">
                <Library className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                Ready to dive into your next great adventure?
              </h2>
              <p className="text-white/90 text-xl mb-12 font-medium leading-relaxed max-w-2xl">
                Join thousands of readers discovering their new favorite books every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                <Link href="/explore" className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2">
                  Start Exploring <Search className="w-5 h-5" />
                </Link>
                <Link href="/register" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                  Create Account <User className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
