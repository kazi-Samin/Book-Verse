"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

interface StaticBook {
  title: string;
  author: string;
  category: string;
  price: string;
  rating: string;
  reviews: string;
  img: string;
}

const IMG1 = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";
const IMG2 = "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop";
const IMG3 = "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop";
const IMG4 = "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=600&auto=format&fit=crop";
const IMG5 = "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop";
const IMG6 = "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=600&auto=format&fit=crop";
const IMG7 = "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop";
const IMG8 = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop";

const newArrivals: StaticBook[] = [
  { title: "The Silent Observer", author: "Sarah J. Wellington", category: "Fiction", price: "$24.00", rating: "4.8", reviews: "1.2k", img: IMG1 },
  { title: "Future Pulse", author: "Marcus Thorne", category: "Sci-Fi", price: "$19.50", rating: "4.9", reviews: "850", img: IMG2 },
  { title: "Echoes of History", author: "Dr. Helena Vance", category: "History", price: "$32.00", rating: "4.7", reviews: "2.1k", img: IMG3 },
  { title: "Mindful Flow", author: "Elena Rossi", category: "Psychology", price: "$21.99", rating: "5.0", reviews: "540", img: IMG4 },
];

const topRated: StaticBook[] = [
  { title: "Whispers in the Dark", author: "Liam Cross", category: "Mystery", price: "$18.99", rating: "4.9", reviews: "3.4k", img: IMG5 },
  { title: "The Last Algorithm", author: "Priya Sharma", category: "Sci-Fi", price: "$27.00", rating: "4.8", reviews: "1.8k", img: IMG6 },
  { title: "Beneath the Surface", author: "Olivia Hart", category: "Psychology", price: "$22.50", rating: "4.9", reviews: "980", img: IMG7 },
  { title: "Empire of Dust", author: "James Aldrin", category: "History", price: "$29.99", rating: "4.7", reviews: "2.5k", img: IMG8 },
];

import { useCart } from "@/hooks/useCart";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function StaticBookCard({ title, author, category, price, rating, reviews, img }: StaticBook) {
  const { addItem } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  
  const pseudoId = title.toLowerCase().replace(/\s+/g, '-');
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent linking if wrapped in a link
    
    if (!session) {
      toast.error("Please log in to add books to your cart.");
      router.push(`/login`);
      return;
    }
    
    // Generate a pseudo-ID for the static book so it works in the cart
    const numericPrice = parseFloat(price.replace('$', ''));
    
    addItem({
      _id: pseudoId,
      title: title,
      author: author,
      price: numericPrice,
      coverImage: img
    });
    
    toast.success("Added to cart!");
  };

  return (
    <Link href={`/book/${pseudoId}`} className="group bg-surface rounded-xl border border-outline-variant overflow-hidden hover:scale-[1.02] transition-all whisper-shadow flex flex-col h-full block">
      <div className="p-4 bg-surface-container-low overflow-hidden">
        <img className="w-full aspect-[4/5] object-cover rounded shadow-lg group-hover:rotate-1 transition-transform border border-black/5" alt={title} src={img} />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <span className="font-label-caps text-[10px] text-primary uppercase mb-1.5 tracking-wider font-bold">{category}</span>
        <h3 className="font-card-title text-lg font-bold text-on-background mb-1 line-clamp-2 leading-tight">{title}</h3>
        <p className="font-caption text-[13px] text-on-surface-variant mb-3">{author}</p>
        <div className="flex items-center gap-1 mb-5">
          <span className="material-symbols-outlined text-tertiary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="font-caption text-[13px] text-on-background font-medium">{rating}</span>
          <span className="font-caption text-[13px] text-on-surface-variant ml-1">({reviews})</span>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <span className="font-card-title text-lg text-primary font-black">{price}</span>
          <button 
            onClick={handleAddToCart}
            className="p-2 rounded-full border border-outline-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all z-10"
            title="Add to Cart"
          >
            <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const categories = [
    { name: "Fiction", icon: "auto_stories" },
    { name: "Sci-Fi", icon: "science" },
    { name: "Psychology", icon: "psychology" },
    { name: "History", icon: "history_edu" },
    { name: "Mystery", icon: "mystery" },
    { name: "More", icon: "menu_book" },
  ];

  const stats = [
    { value: "50k+", label: "Active Readers", icon: "group" },
    { value: "12k+", label: "Total Books", icon: "menu_book" },
    { value: "150+", label: "Authors Joined", icon: "edit_note" },
    { value: "99%", label: "Happy Readers", icon: "sentiment_satisfied" },
  ];

  const testimonials = [
    { name: "Emily Chen", role: "Avid Reader", quote: "BookVerse completely changed how I discover new authors. The recommendations are spot-on, and the delivery is incredibly fast." },
    { name: "Michael T.", role: "Book Club Host", quote: "The curated collections here are unmatched. We buy all our book club selections from BookVerse. Highly recommended!" },
    { name: "Sarah Jenkins", role: "Literature Student", quote: "I love the clean interface and the seamless reading experience. It's truly a premium sanctuary for book lovers." },
  ];

  const features = [
    { icon: "local_shipping", title: "Lightning Fast Delivery", desc: "Get your physical copies delivered to your doorstep within 48 hours, anywhere in the world." },
    { icon: "workspace_premium", title: "Premium Quality", desc: "Every book is meticulously checked for quality, ensuring you receive pristine, beautifully bound editions." },
    { icon: "forum", title: "Vibrant Community", desc: "Join thousands of readers in discussions, book clubs, and exclusive author Q&A sessions." },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-section-v-space grid lg:grid-cols-2 gap-gutter items-center">
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1 variants={fadeUp} custom={0} className="font-hero-lg text-hero-lg text-on-background max-w-xl">
            Discover Books You&apos;ll Love
          </motion.h1>
          <motion.p variants={fadeUp} custom={1} className="font-body-main text-body-main text-on-surface-variant max-w-lg">
            Browse thousands of books across different genres with a clean and enjoyable reading experience. From timeless classics to modern bestsellers, find your next sanctuary here.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-4 pt-4">
            <Link href="/explore" className="px-8 py-4 bg-primary text-on-primary rounded-lg font-body-main font-semibold hover:opacity-90 transition-all active:scale-95 inline-block">
              Explore Books
            </Link>
            <Link href="/about" className="px-8 py-4 border border-outline-variant text-on-background rounded-lg font-body-main font-semibold hover:bg-surface-container-low transition-all active:scale-95 inline-block">
              Learn More
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="relative flex justify-center items-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full max-w-md aspect-square hero-float">
            <div className="absolute inset-0 bg-primary/5 rounded-full scale-110 -z-10"></div>
            <img
              className="w-full h-full object-contain drop-shadow-2xl"
              alt="A curated, artistic stack of hardcover books"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAjAtNB1peW782yC1Q0xN4-JJu-xXApTh-IgD9_iUcgrZ4J-_GE5VCmFGVI7cmHvH5QTPdWFTnNVFcOeECoRRGWneIWx-D6kyBFkKWtnozVIIlabvnCfAHrPQMTiS1sMg7zWSW9EIsmAz5mb0KwRTbXHU4aK2YWeptMmxRkC-H-hFl4t2ADiRL6m-HzC6udvsudFPcJtuW_p4R0ShDvi2sBBced6rKZoOM1kVpCZSQQWA8qybaIGqFEbIi-hyUGYA2nomNVuLRVJk"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="bg-surface-container-lowest py-section-v-space">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-section-title text-section-title text-on-background mb-4">Curated Genres</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {categories.map((cat, i) => (
              <motion.div key={cat.name} variants={fadeUp} custom={i}>
                <Link
                  href={cat.name === "More" ? "/explore" : `/explore?category=${cat.name}`}
                  className="group flex flex-col items-center gap-4 p-8 bg-surface rounded-xl border border-outline-variant hover:border-primary transition-all cursor-pointer whisper-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors text-primary">
                    <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-background uppercase tracking-widest">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* New Arrivals — Static */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-section-v-space">
        <motion.div className="flex justify-between items-end mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
          <div>
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-2">Just Landed</span>
            <h2 className="font-section-title text-section-title text-on-background">New Arrivals</h2>
          </div>
          <Link href="/explore" className="font-body-main text-primary hover:underline flex items-center gap-2 font-medium">View all <ArrowRight className="w-4 h-4" /></Link>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
          {newArrivals.map((book, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <StaticBookCard {...book} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-desktop"><div className="border-t border-outline-variant"></div></div>

      {/* Top Rated — Static */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-section-v-space">
        <motion.div className="flex justify-between items-end mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
          <div>
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-2">Reader Favorites</span>
            <h2 className="font-section-title text-section-title text-on-background">Top Rated Books</h2>
          </div>
          <Link href="/explore" className="font-body-main text-primary hover:underline flex items-center gap-2 font-medium">View all <ArrowRight className="w-4 h-4" /></Link>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
          {topRated.map((book, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <StaticBookCard {...book} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-desktop"><div className="border-t border-outline-variant"></div></div>


      {/* Why Choose Us Section */}
      <section className="bg-surface-container-low py-section-v-space border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-section-title text-section-title text-on-background mb-4">Why Choose BookVerse?</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="mt-6 text-on-surface-variant max-w-2xl mx-auto font-body-main">We provide an unparalleled reading experience with features designed to help you discover, enjoy, and organize your favorite books.</p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {features.map((feat, i) => (
              <motion.div key={feat.title} variants={fadeUp} custom={i} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-4xl">{feat.icon}</span>
                </div>
                <h3 className="font-card-title text-xl font-bold text-on-background mb-3">{feat.title}</h3>
                <p className="text-on-surface-variant font-body-main">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-section-v-space">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-section-title text-section-title text-on-background mb-4">What Our Readers Say</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              variants={fadeUp}
              custom={i}
              className="bg-surface p-8 rounded-2xl border border-outline-variant whisper-shadow flex flex-col h-full relative"
            >
              <span className="absolute top-6 left-6 material-symbols-outlined text-6xl text-primary/10">format_quote</span>
              <p className="font-body-main text-on-background italic mb-8 relative z-10 pt-4">&quot;{testimonial.quote}&quot;</p>
              <div className="mt-auto flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-on-background">{testimonial.name}</h4>
                  <p className="text-xs text-on-surface-variant font-label-caps uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-12 mb-section-v-space">
        <motion.div
          className="bg-surface rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden border border-outline-variant whisper-shadow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-3xl"></div>
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-3">Stay Updated</span>
            <h2 className="text-3xl font-bold mb-4 font-section-title text-on-background">Join Our Newsletter</h2>
            <p className="text-on-surface-variant font-body-main">Subscribe to get the latest updates on new arrivals, exclusive discounts, and hand-picked book recommendations.</p>
          </div>
          <div className="relative z-10 w-full max-w-md">
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-6 py-4 rounded-xl bg-surface-container-low border border-outline-variant text-on-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="bg-surface-container-lowest py-section-v-space border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i} className="flex flex-col items-center gap-3 p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-2xl text-primary">{stat.icon}</span>
                </div>
                <div className="text-4xl font-bold text-on-background tracking-tight">{stat.value}</div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
