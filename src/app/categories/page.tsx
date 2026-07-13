"use client";

import Link from "next/link";
import { ChevronRight, ArrowRight, BookOpen, Users, Star, Award, Code, Monitor, Briefcase, History, Sparkles, Rocket, Search, Heart, User, Sun, Smile, Book } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.08 } },
  hidden: { opacity: 0 }
};

const categories = [
  { name: "Programming", icon: Code, desc: "Master the art of coding and software architecture.", count: "1,204", color: "bg-blue-50 text-blue-600" },
  { name: "Technology", icon: Monitor, desc: "Explore the latest trends in tech and innovation.", count: "845", color: "bg-indigo-50 text-indigo-600" },
  { name: "Business", icon: Briefcase, desc: "Insights on entrepreneurship, finance, and management.", count: "2,150", color: "bg-emerald-50 text-emerald-600" },
  { name: "History", icon: History, desc: "Dive into the events that shaped our world.", count: "3,420", color: "bg-amber-50 text-amber-600" },
  { name: "Fantasy", icon: Sparkles, desc: "Epic tales of magic, dragons, and unknown realms.", count: "4,100", color: "bg-purple-50 text-purple-600" },
  { name: "Science Fiction", icon: Rocket, desc: "Journey through time, space, and futuristic worlds.", count: "2,890", color: "bg-cyan-50 text-cyan-600" },
  { name: "Mystery", icon: Search, desc: "Thrilling whodunits and suspenseful page-turners.", count: "3,750", color: "bg-gray-100 text-gray-700" },
  { name: "Romance", icon: Heart, desc: "Captivating stories of love, passion, and relationships.", count: "5,200", color: "bg-rose-50 text-rose-600" },
  { name: "Biography", icon: User, desc: "Inspiring true stories of remarkable individuals.", count: "1,850", color: "bg-orange-50 text-orange-600" },
  { name: "Self Development", icon: Sun, desc: "Transform your life with actionable advice and habits.", count: "2,980", color: "bg-yellow-50 text-yellow-600" },
  { name: "Children's Books", icon: Smile, desc: "Delightful stories to spark imagination in young minds.", count: "1,540", color: "bg-pink-50 text-pink-600" },
  { name: "Classic Literature", icon: Book, desc: "Timeless masterpieces that have endured for generations.", count: "4,630", color: "bg-stone-50 text-stone-600" },
];

const popularCategories = [
  { name: "Manga & Graphic Novels", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcF3_0KAP48EMfpEAAiySH-PgtIo-A26xH4vEjXoUduYzyTmGgZiaXcVmJ-JaZYUOIEx-ZJzc1le4JI5_HDZWue-BFNhXECNAeQ1qqimm94aRXLkQphxXltOAIBw6sWOSG5uyeS6j9I2uwDoO_pbB49-MrTQJ2Cvq9RHT1TJVs-kNk2xDBxjwR5-hBQjqN5VU_DAS-myhO0syyzgwHv7iGfjxAEuUzvUj63RQOIuR2kLlI2xyzDjBlr_C8eROdIbXkjlh41lXZOs8" },
  { name: "Thrillers", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoIu1MYU5RuYjA2U3XiSH1VqrTdmB5SV1MTV80tY2fLbSQ1ycUgzqjs8oY3SIOoQhcPHiE7hnivQrbHmeAeH4bc3fhskwjjWmKoQkbbeA6-GfKMHykTqQbV-_ls6LYpdB4ComuodM3q3mdg9LEVBghsb47RWEgynllrHeFK9Q_TxBOntUtlYDiu-wWYd_3Qtc3HLLvj_DuF4XNVerv02XNuqCKguM_V3WaYxlzd2wRDoHnwIcP-0Kq5jGkcqoFHdqkmWj3gHIRNG0" },
  { name: "Historical Fiction", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVwnEhqjvNIiujHAPaeaKRPf-15YM0vA9Qox_d96Su8Ki881ZawNFiujfR74CVMuURXTTCQaTOcgSpBt-eRNFHRAHApKICaQpfGUxixFvQHLfCmU49diaFm8NlWfJ4lbWQlYAsFZo7nPw4jEuq26r6G0RX3Byq8AoPvzKDDFceNJdW02wyV0mBnB--KHeMWprtXNi9uTqlUiiJQtPsXvKM6HaKp8ZlEQ2VCYLLD5A2ufcTckn6FEC1SQ_MZhEuzH8OIj8U0viMbLs" },
  { name: "Cookbooks", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT5oiN3QDc0kL9JrZT_vH6mfLn9VO6bFnEWa1H549c-_2L6EOZpNZkYNaWwK5Ml1WG8ZytBVmMdsL4lOHyhfdEZ4q2TB67o9lHZBeFPTuJcOaKG84JlCccM2Sf5dFSjO9M0neq2Zg9HdERAN-JFQdd7xUJNgMg3GyI0cdta_OrdnQyD0hZl-LNJsOejetOyMGITVqkHXRcaKEPfHLZF_dv1bsaSZ86g4rHsshLjHxWV-C5K_P2rIdHgqreTttqG8upiAAXcwhp-hY" },
];

const topAuthors = [
  { name: "Stephen King", category: "Horror / Thriller", books: 64 },
  { name: "J.K. Rowling", category: "Fantasy", books: 15 },
  { name: "Agatha Christie", category: "Mystery", books: 75 },
  { name: "Neil Gaiman", category: "Fantasy / Sci-Fi", books: 32 },
  { name: "Margaret Atwood", category: "Literary Fiction", books: 28 },
  { name: "Haruki Murakami", category: "Magical Realism", books: 21 },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="bg-surface-container-lowest border-b border-outline-variant pt-12 pb-20">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-on-background font-medium">Categories</span>
          </div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.h1 variants={fadeUp} custom={0} className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-background mb-6 leading-tight">
              Explore A World Of <span className="text-primary">Genres</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={1} className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
              Whether you're looking to learn a new skill, get lost in a fantasy world, or understand the past, our curated categories help you find exactly what you're looking for.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-container-max mx-auto px-margin-desktop -mt-10 relative z-10 mb-20">
        <motion.div 
          className="bg-surface rounded-2xl border border-outline-variant whisper-shadow p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-outline-variant/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="text-center px-4">
            <div className="flex justify-center mb-3"><BookOpen className="w-8 h-8 text-primary" /></div>
            <div className="text-3xl font-bold text-on-background mb-1">32+</div>
            <div className="text-sm font-label-caps text-on-surface-variant uppercase tracking-widest">Categories</div>
          </div>
          <div className="text-center px-4">
            <div className="flex justify-center mb-3"><Book className="w-8 h-8 text-primary" /></div>
            <div className="text-3xl font-bold text-on-background mb-1">12k+</div>
            <div className="text-sm font-label-caps text-on-surface-variant uppercase tracking-widest">Total Books</div>
          </div>
          <div className="text-center px-4">
            <div className="flex justify-center mb-3"><Users className="w-8 h-8 text-primary" /></div>
            <div className="text-3xl font-bold text-on-background mb-1">850+</div>
            <div className="text-sm font-label-caps text-on-surface-variant uppercase tracking-widest">Authors</div>
          </div>
          <div className="text-center px-4">
            <div className="flex justify-center mb-3"><Star className="w-8 h-8 text-primary" /></div>
            <div className="text-3xl font-bold text-on-background mb-1">4.8</div>
            <div className="text-sm font-label-caps text-on-surface-variant uppercase tracking-widest">Avg Rating</div>
          </div>
        </motion.div>
      </section>

      {/* Featured Categories Grid */}
      <section className="max-w-container-max mx-auto px-margin-desktop mb-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="text-3xl font-bold text-on-background mb-4">Browse by Category</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {categories.map((category, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <Link href={`/explore?category=${encodeURIComponent(category.name)}`} className="block bg-surface rounded-2xl p-6 border border-outline-variant hover:border-primary/50 hover:shadow-lg transition-all group h-full">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${category.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-on-background mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                <p className="text-sm text-on-surface-variant mb-4">{category.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/50">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{category.count} Books</span>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Popular Trending Categories - Horizontal Scroll */}
      <section className="bg-surface-container-low py-20 border-y border-outline-variant mb-24 overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div>
              <span className="font-label-caps text-primary uppercase tracking-widest block mb-2">Trending Now</span>
              <h2 className="text-3xl font-bold text-on-background">Popular Collections</h2>
            </div>
          </motion.div>

          <motion.div 
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {popularCategories.map((cat, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="min-w-[280px] md:min-w-[320px] snap-start flex-shrink-0">
                <Link href={`/explore?category=${encodeURIComponent(cat.name)}`} className="group block relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-primary-200 transition-colors">{cat.name}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                      Explore Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Top Authors by Category */}
      <section className="max-w-container-max mx-auto px-margin-desktop mb-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="text-3xl font-bold text-on-background mb-4">Discover Top Authors</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {topAuthors.map((author, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="bg-surface rounded-xl p-6 border border-outline-variant flex items-center gap-5 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-xl font-bold text-primary flex-shrink-0">
                {author.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-lg text-on-background">{author.name}</h4>
                <p className="text-sm text-on-surface-variant font-medium mb-1">{author.category}</p>
                <p className="text-xs text-primary font-semibold">{author.books} Books</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trending Books Section */}
      <section className="max-w-container-max mx-auto px-margin-desktop mb-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="text-3xl font-bold text-on-background mb-4">Trending in Categories</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {[
            { title: "The Silent Observer", author: "Sarah J. Wellington", category: "Mystery", price: "$24.00", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop" },
            { title: "Future Pulse", author: "Marcus Thorne", category: "Sci-Fi", price: "$19.50", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop" },
            { title: "Echoes of History", author: "Dr. Helena Vance", category: "History", price: "$32.00", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop" },
            { title: "Mindful Flow", author: "Elena Rossi", category: "Self Development", price: "$21.99", img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=600&auto=format&fit=crop" }
          ].map((book, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <Link href="/explore" className="block group">
                <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-md border border-outline-variant/30 mb-4 bg-surface-container relative">
                  <img src={book.img} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
                    {book.category}
                  </div>
                </div>
                <h3 className="font-bold text-on-background line-clamp-1 group-hover:text-primary transition-colors">{book.title}</h3>
                <p className="text-sm text-on-surface-variant font-medium mb-1">{book.author}</p>
                <p className="font-bold text-primary">{book.price}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-container-max mx-auto px-margin-desktop mb-12">
        <motion.div 
          className="bg-primary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-on-primary mb-6">Can't decide where to start?</h2>
            <p className="text-on-primary/90 text-lg mb-8">
              Browse our complete collection of over 12,000 books across all categories. Use our advanced filters to find exactly what you're looking for.
            </p>
            <Link href="/explore" className="inline-flex items-center gap-2 bg-surface text-primary px-8 py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl">
              Browse All Books <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
