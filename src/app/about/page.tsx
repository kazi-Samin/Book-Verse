"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Globe, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Editorial Hero */}
      <section className="pt-32 pb-16 px-margin-desktop max-w-container-max mx-auto text-center">
        <motion.div 
          initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={0} className="mb-6">
            <span className="font-label-caps text-sm uppercase tracking-[0.2em] text-primary font-bold">The BookVerse Manifesto</span>
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-7xl lg:text-8xl font-bold text-on-background tracking-tighter leading-[0.9] mb-8">
            Stories <br />
            <span className="text-on-surface-variant font-light italic">Without Borders</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-light">
            We are building the world's most elegant digital sanctuary for literature. A place where the noise of the internet fades, leaving only you and the author's words.
          </motion.p>
        </motion.div>
      </section>

      {/* Massive Hero Image */}
      <section className="px-4 md:px-margin-desktop max-w-[1600px] mx-auto mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full aspect-[21/9] md:aspect-[21/7] rounded-3xl overflow-hidden shadow-2xl relative"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBByZA9gsdOxtTXXU8e4rwUGbcOHu15JZdieind0h8_QtSsN-mYS3mtDS_JxFCOYmahrWsZQZpKIJwLcfw_RZtGAoCqkvOqs1eVdvzPYq5iV6HuvgRMldJkEsKRfT48HSRld2P02Ijcvu7gjmEtnJqLfP-_XY1OAjjvT_Gf-zQYOmJXnPl0l2QOLR_DwKDeqrbk7h9lN4_3XQIXN-knDtZRiymGEzKHUaXwU5nVVF_KG31QGc-g2KehheGcySPk4HtFl-RzpR9RlWM" 
            alt="Minimalist library" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        </motion.div>
      </section>

      {/* Editorial Split Section */}
      <section className="max-w-container-max mx-auto px-margin-desktop mb-32">
        <div className="grid md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-on-background sticky top-32"
            >
              Why we started <br />BookVerse.
            </motion.h2>
          </div>
          <div className="md:col-span-7 space-y-12 text-lg md:text-xl text-on-surface-variant font-light leading-relaxed">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              In an era dominated by algorithmic feeds and endless scrolling, reading a book remains one of the few acts of sustained, deep focus. Yet, discovering and purchasing books online has become a cluttered, ad-heavy experience.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              We started BookVerse in 2024 to change that. We believe that the environment in which you browse books should be as considered and beautiful as the books themselves.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              By stripping away the unnecessary and focusing entirely on typography, whitespace, and curation, we've created a platform that honors the written word and respects your attention.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Philosophy Metrics */}
      <section className="bg-surface-container-lowest py-32 border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid md:grid-cols-3 gap-16 md:gap-8">
            {[
              { num: "12M+", label: "Pages Turned", desc: "Our community engages deeply with the content they discover here." },
              { num: "0", label: "Advertisements", desc: "We rely entirely on book sales, ensuring a pure, uninterrupted experience." },
              { num: "100%", label: "Independent", desc: "We are not owned by any major publisher, allowing us to champion diverse voices." }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="text-6xl md:text-7xl font-bold text-primary mb-4 tracking-tighter">{stat.num}</div>
                <h3 className="text-2xl font-bold text-on-background mb-3">{stat.label}</h3>
                <p className="text-on-surface-variant font-light">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership - Editorial Style */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="aspect-[3/4] md:aspect-square bg-surface-container-low rounded-3xl overflow-hidden"
          >
             <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAjAtNB1peW782yC1Q0xN4-JJu-xXApTh-IgD9_iUcgrZ4J-_GE5VCmFGVI7cmHvH5QTPdWFTnNVFcOeECoRRGWneIWx-D6kyBFkKWtnozVIIlabvnCfAHrPQMTiS1sMg7zWSW9EIsmAz5mb0KwRTbXHU4aK2YWeptMmxRkC-H-hFl4t2ADiRL6m-HzC6udvsudFPcJtuW_p4R0ShDvi2sBBced6rKZoOM1kVpCZSQQWA8qybaIGqFEbIi-hyUGYA2nomNVuLRVJk" 
              alt="Founders" 
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
          
          <div>
            <motion.span 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="font-label-caps text-primary tracking-[0.2em] uppercase font-bold text-sm mb-4 block"
            >
              The Architecture of Reading
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-on-background mb-8 leading-tight"
            >
              Designed for readers, by readers.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-lg text-on-surface-variant font-light mb-12 leading-relaxed"
            >
              Our founding team is comprised of former librarians, indie authors, and minimalist software engineers. We united under a shared frustration with the modern web and a shared love for the timeless book.
            </motion.p>
            
            <div className="space-y-8">
              {[
                { name: "Eleanor Wright", role: "Founder & Curator" },
                { name: "Marcus Thorne", role: "Head of Engineering" },
                { name: "Sofia Patel", role: "Principal Designer" }
              ].map((person, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between border-b border-outline-variant/30 pb-4"
                >
                  <span className="text-xl font-bold text-on-background">{person.name}</span>
                  <span className="text-on-surface-variant font-medium">{person.role}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simple Text CTA */}
      <section className="bg-on-background text-background py-32 text-center px-margin-desktop">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-10">Join the movement.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/explore" className="px-10 py-5 bg-background text-on-background rounded-full font-bold hover:scale-105 transition-transform text-lg">
              Explore Library
            </Link>
            <Link href="/contact" className="px-10 py-5 border border-outline-variant/30 rounded-full font-bold hover:bg-white/10 transition-colors text-lg">
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
