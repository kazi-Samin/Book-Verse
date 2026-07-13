"use client";

import Link from "next/link";
import { BookOpen, Users, Globe, ShieldCheck, ArrowRight, Target, Compass, CheckCircle2, Linkedin, Star, Book, Sparkles } from "lucide-react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  const team = [
    { name: "Eleanor Wright", role: "Founder & CEO", bio: "Former head librarian who envisioned a global digital sanctuary for book lovers.", img: "https://i.pravatar.cc/150?u=eleanor" },
    { name: "Marcus Thorne", role: "Lead Engineer", bio: "Architecting scalable systems to ensure your reading experience is always seamless.", img: "https://i.pravatar.cc/150?u=marcus" },
    { name: "Sofia Patel", role: "Head of Design", bio: "Obsessed with typography, whitespace, and creating intuitive user interfaces.", img: "https://i.pravatar.cc/150?u=sofia" },
    { name: "James Holden", role: "Community Director", bio: "Building bridges between authors and readers through engaging events.", img: "https://i.pravatar.cc/150?u=james" },
  ];

  const testimonials = [
    { name: "Sarah Jenkins", role: "Avid Reader", text: "BookVerse completely changed how I discover new authors. The recommendations are spot-on, and the interface is incredibly clean.", rating: 5 },
    { name: "Michael T.", role: "Book Club Host", text: "The curated collections here are unmatched. We buy all our book club selections from BookVerse. Highly recommended!", rating: 5 },
    { name: "Emily Chen", role: "Literature Student", text: "I love the seamless reading experience. It feels like a premium sanctuary for book lovers, without the clutter of other platforms.", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="pt-20 pb-24 md:pt-32 md:pb-32 border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-desktop grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-6 px-3 py-1 bg-primary/10 text-primary rounded-full font-label-caps text-xs uppercase tracking-widest font-bold">
              About BookVerse
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-background mb-6 leading-[1.15] tracking-tight">
              Making Reading More <br className="hidden md:block"/>
              <span className="text-primary">Accessible for Everyone.</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-on-surface-variant mb-10 leading-relaxed max-w-lg">
              We combine a deep passion for literature with elegant technology to create a sanctuary where stories thrive and readers connect globally.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link href="/explore" className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20">
                Explore Books
              </Link>
              <Link href="/contact" className="px-8 py-4 border border-outline-variant text-on-background rounded-xl font-bold hover:bg-surface-container-low transition-all active:scale-95">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Soft decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/5 border border-outline-variant/50">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBByZA9gsdOxtTXXU8e4rwUGbcOHu15JZdieind0h8_QtSsN-mYS3mtDS_JxFCOYmahrWsZQZpKIJwLcfw_RZtGAoCqkvOqs1eVdvzPYq5iV6HuvgRMldJkEsKRfT48HSRld2P02Ijcvu7gjmEtnJqLfP-_XY1OAjjvT_Gf-zQYOmJXnPl0l2QOLR_DwKDeqrbk7h9lN4_3XQIXN-knDtZRiymGEzKHUaXwU5nVVF_KG31QGc-g2KehheGcySPk4HtFl-RzpR9RlWM" 
                alt="Modern library architecture" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Story (Timeline) */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-desktop grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 relative rounded-3xl overflow-hidden aspect-[3/4] shadow-xl shadow-black/5 border border-outline-variant/50"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAjAtNB1peW782yC1Q0xN4-JJu-xXApTh-IgD9_iUcgrZ4J-_GE5VCmFGVI7cmHvH5QTPdWFTnNVFcOeECoRRGWneIWx-D6kyBFkKWtnozVIIlabvnCfAHrPQMTiS1sMg7zWSW9EIsmAz5mb0KwRTbXHU4aK2YWeptMmxRkC-H-hFl4t2ADiRL6m-HzC6udvsudFPcJtuW_p4R0ShDvi2sBBced6rKZoOM1kVpCZSQQWA8qybaIGqFEbIi-hyUGYA2nomNVuLRVJk" 
              alt="Books curation" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-on-background mb-4">The BookVerse Journey</h2>
              <p className="text-on-surface-variant text-lg">How a simple idea grew into a global reading destination.</p>
            </motion.div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/20 before:via-primary/50 before:to-transparent">
              {[
                { year: "2024", title: "The Idea Born", desc: "BookVerse started in a small cafe, fueled by the desire to organize the world's literature beautifully." },
                { year: "2025", title: "Platform Launched", desc: "We released version 1.0, instantly connecting thousands of readers with independent authors." },
                { year: "2026", title: "10,000+ Readers", desc: "Our community grew exponentially, transforming BookVerse into a leading digital bookstore." },
                { year: "Future", title: "Global Expansion", desc: "Expanding our catalog worldwide, bringing translated works and rare editions to your screen." },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-background bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-[2px] z-10"></div>
                  
                  {/* Content */}
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] pl-8 md:pl-0 md:group-odd:pr-8 md:group-even:pl-8">
                    <div className="bg-surface p-6 rounded-2xl border border-outline-variant whisper-shadow group-hover:border-primary/30 transition-colors">
                      <span className="font-bold text-primary mb-1 block">{item.year}</span>
                      <h4 className="text-xl font-bold text-on-background mb-2">{item.title}</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface rounded-3xl p-10 md:p-12 border border-outline-variant hover:shadow-xl hover:shadow-primary/5 transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-on-background mb-4">Our Mission</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              To democratize access to knowledge and storytelling by providing a premium, distraction-free platform where discovering and purchasing books is an absolute joy. We believe every great book deserves to be found.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-surface rounded-3xl p-10 md:p-12 border border-outline-variant hover:shadow-xl hover:shadow-secondary/5 transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary-fixed/30 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
              <Compass className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-on-background mb-4">Our Vision</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              To build the world's most trusted and beloved digital library. We envision a future where borders don't limit access to literature, and technology enhances—rather than distracts from—the reading experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Statistics */}
      <section className="py-20 bg-surface-container-low border-y border-outline-variant overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-outline-variant/50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { label: "Books Catalog", value: 20000, suffix: "+" },
              { label: "Active Readers", value: 5000, suffix: "+" },
              { label: "Published Authors", value: 500, suffix: "+" },
              { label: "Satisfaction Rate", value: 99, suffix: "%" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-bold text-on-background mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-label-caps text-on-surface-variant uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-on-background mb-4">What Drives Us</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {[
            { icon: Sparkles, title: "Quality First", desc: "We rigorously curate our catalog to ensure only the highest quality content reaches our readers." },
            { icon: Globe, title: "Accessibility", desc: "Literature should be available to everyone, regardless of geography or device constraints." },
            { icon: BookOpen, title: "Innovation", desc: "Constantly refining our platform to provide a seamless, modern reading experience." },
            { icon: Users, title: "Community", desc: "Fostering meaningful connections between authors and the readers who love their work." }
          ].map((val, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp} 
              custom={i}
              className="bg-surface p-8 rounded-2xl border border-outline-variant whisper-shadow hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <val.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-background mb-3">{val.title}</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">{val.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-24 bg-surface-container-lowest border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-desktop grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/5 border border-outline-variant/50"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoIu1MYU5RuYjA2U3XiSH1VqrTdmB5SV1MTV80tY2fLbSQ1ycUgzqjs8oY3SIOoQhcPHiE7hnivQrbHmeAeH4bc3fhskwjjWmKoQkbbeA6-GfKMHykTqQbV-_ls6LYpdB4ComuodM3q3mdg9LEVBghsb47RWEgynllrHeFK9Q_TxBOntUtlYDiu-wWYd_3Qtc3HLLvj_DuF4XNVerv02XNuqCKguM_V3WaYxlzd2wRDoHnwIcP-0Kq5jGkcqoFHdqkmWj3gHIRNG0" 
              alt="Reading concept" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-on-background mb-6">Built for the Modern Reader</h2>
              <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
                BookVerse isn't just a bookstore; it's an ecosystem designed to eliminate friction from your reading habit. We obsess over the details so you don't have to.
              </p>
            </motion.div>

            <motion.div 
              className="grid sm:grid-cols-2 gap-x-8 gap-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {[
                "Unmatched Collection", 
                "Verified Global Authors", 
                "Transparent Pricing", 
                "Smart Recommendations",
                "Cross-device Sync",
                "Secure Transactions"
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-semibold text-on-background">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Meet Our Team */}
      <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-on-background mb-4">Meet The Team</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-on-surface-variant max-w-2xl mx-auto">The passionate individuals working behind the scenes to build your sanctuary for stories.</p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {team.map((member, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp} 
              custom={i}
              className="bg-surface rounded-2xl border border-outline-variant overflow-hidden group hover:shadow-lg transition-all"
            >
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-on-background mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-bold mb-3">{member.role}</p>
                <p className="text-on-surface-variant text-sm mb-4 line-clamp-3">{member.bio}</p>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors inline-block">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 8. Reader Testimonials */}
      <section className="py-24 bg-surface-container-low border-y border-outline-variant overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="font-label-caps text-primary uppercase tracking-widest block mb-2">Community Voices</span>
              <h2 className="text-3xl font-bold text-on-background">Loved by Readers Worldwide</h2>
            </div>
          </motion.div>

          <motion.div 
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {testimonials.map((test, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="min-w-[320px] md:min-w-[400px] snap-start flex-shrink-0 bg-surface p-8 rounded-2xl border border-outline-variant whisper-shadow">
                <div className="flex gap-1 mb-6 text-tertiary">
                  {[...Array(test.rating)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-on-background text-lg leading-relaxed mb-8">"{test.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-on-background">{test.name}</h4>
                    <p className="text-sm text-on-surface-variant font-medium">{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. Call To Action Banner */}
      <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
        <motion.div 
          className="bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-on-primary mb-6 leading-tight">Ready to Discover Your Next Favorite Book?</h2>
            <p className="text-on-primary/90 text-xl mb-10 max-w-2xl mx-auto">
              Join our growing community today and get access to thousands of curated titles tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/explore" className="px-8 py-4 bg-surface text-primary rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/10">
                Browse Books
              </Link>
              <Link href="/register" className="px-8 py-4 bg-transparent border border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all active:scale-95">
                Create Account
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
      
    </div>
  );
}
