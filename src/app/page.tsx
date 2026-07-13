import Image from "next/image";
import Link from "next/link";
import { BookOpen, FlaskConical, BrainCircuit, Landmark, Search, MoreHorizontal } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-section-v-space grid lg:grid-cols-2 gap-gutter items-center">
        <div className="space-y-8">
          <h1 className="font-hero-lg text-hero-lg text-on-background max-w-xl">Discover Books You'll Love</h1>
          <p className="font-body-main text-body-main text-on-surface-variant max-w-lg">
            Browse thousands of books across different genres with a clean and enjoyable reading experience. From timeless classics to modern bestsellers, find your next sanctuary here.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/explore" className="px-8 py-4 bg-primary text-on-primary rounded-lg font-body-main font-semibold hover:opacity-90 transition-all active:scale-95 inline-block">
              Explore Books
            </Link>
            <Link href="/categories" className="px-8 py-4 border border-outline-variant text-on-background rounded-lg font-body-main font-semibold hover:bg-surface-container-low transition-all active:scale-95 inline-block">
              Browse Categories
            </Link>
          </div>
        </div>
        <div className="relative flex justify-center items-center lg:justify-end">
          <div className="relative w-full max-w-md aspect-square hero-float">
            <div className="absolute inset-0 bg-primary/5 rounded-full scale-110 -z-10"></div>
            <img 
              className="w-full h-full object-contain drop-shadow-2xl" 
              alt="A curated, artistic stack of hardcover books" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAjAtNB1peW782yC1Q0xN4-JJu-xXApTh-IgD9_iUcgrZ4J-_GE5VCmFGVI7cmHvH5QTPdWFTnNVFcOeECoRRGWneIWx-D6kyBFkKWtnozVIIlabvnCfAHrPQMTiS1sMg7zWSW9EIsmAz5mb0KwRTbXHU4aK2YWeptMmxRkC-H-hFl4t2ADiRL6m-HzC6udvsudFPcJtuW_p4R0ShDvi2sBBced6rKZoOM1kVpCZSQQWA8qybaIGqFEbIi-hyUGYA2nomNVuLRVJk"
            />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-surface-container-lowest py-section-v-space">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-section-title text-section-title text-on-background mb-4">Curated Genres</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter">
            
            <div className="group flex flex-col items-center gap-4 p-8 bg-surface rounded-xl border border-outline-variant hover:border-primary transition-all cursor-pointer whisper-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors text-primary">
                <span className="material-symbols-outlined text-3xl">auto_stories</span>
              </div>
              <span className="font-label-caps text-label-caps text-on-background uppercase tracking-widest">Fiction</span>
            </div>

            <div className="group flex flex-col items-center gap-4 p-8 bg-surface rounded-xl border border-outline-variant hover:border-primary transition-all cursor-pointer whisper-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors text-primary">
                <span className="material-symbols-outlined text-3xl">science</span>
              </div>
              <span className="font-label-caps text-label-caps text-on-background uppercase tracking-widest">Sci-Fi</span>
            </div>

            <div className="group flex flex-col items-center gap-4 p-8 bg-surface rounded-xl border border-outline-variant hover:border-primary transition-all cursor-pointer whisper-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors text-primary">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <span className="font-label-caps text-label-caps text-on-background uppercase tracking-widest">Psychology</span>
            </div>

            <div className="group flex flex-col items-center gap-4 p-8 bg-surface rounded-xl border border-outline-variant hover:border-primary transition-all cursor-pointer whisper-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors text-primary">
                <span className="material-symbols-outlined text-3xl">history_edu</span>
              </div>
              <span className="font-label-caps text-label-caps text-on-background uppercase tracking-widest">History</span>
            </div>

            <div className="group flex flex-col items-center gap-4 p-8 bg-surface rounded-xl border border-outline-variant hover:border-primary transition-all cursor-pointer whisper-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors text-primary">
                <span className="material-symbols-outlined text-3xl">mystery</span>
              </div>
              <span className="font-label-caps text-label-caps text-on-background uppercase tracking-widest">Mystery</span>
            </div>

            <div className="group flex flex-col items-center gap-4 p-8 bg-surface rounded-xl border border-outline-variant hover:border-primary transition-all cursor-pointer whisper-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors text-primary">
                <span className="material-symbols-outlined text-3xl">menu_book</span>
              </div>
              <span className="font-label-caps text-label-caps text-on-background uppercase tracking-widest">More</span>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Books Grid */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-section-v-space">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-2">Curated for you</span>
            <h2 className="font-section-title text-section-title text-on-background">Popular This Month</h2>
          </div>
          <Link href="/explore" className="font-body-main text-primary hover:underline flex items-center gap-2">
            View all <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* Static Mock Books for now, to match design precisely */}
          {[
            { title: "The Silent Observer", author: "Sarah J. Wellington", cat: "Fiction", price: "$24.00", rating: "4.8", reviews: "1.2k", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcF3_0KAP48EMfpEAAiySH-PgtIo-A26xH4vEjXoUduYzyTmGgZiaXcVmJ-JaZYUOIEx-ZJzc1le4JI5_HDZWue-BFNhXECNAeQ1qqimm94aRXLkQphxXltOAIBw6sWOSG5uyeS6j9I2uwDoO_pbB49-MrTQJ2Cvq9RHT1TJVs-kNk2xDBxjwR5-hBQjqN5VU_DAS-myhO0syyzgwHv7iGfjxAEuUzvUj63RQOIuR2kLlI2xyzDjBlr_C8eROdIbXkjlh41lXZOs8" },
            { title: "Future Pulse", author: "Marcus Thorne", cat: "Sci-Fi", price: "$19.50", rating: "4.9", reviews: "850", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoIu1MYU5RuYjA2U3XiSH1VqrTdmB5SV1MTV80tY2fLbSQ1ycUgzqjs8oY3SIOoQhcPHiE7hnivQrbHmeAeH4bc3fhskwjjWmKoQkbbeA6-GfKMHykTqQbV-_ls6LYpdB4ComuodM3q3mdg9LEVBghsb47RWEgynllrHeFK9Q_TxBOntUtlYDiu-wWYd_3Qtc3HLLvj_DuF4XNVerv02XNuqCKguM_V3WaYxlzd2wRDoHnwIcP-0Kq5jGkcqoFHdqkmWj3gHIRNG0" },
            { title: "Echoes of History", author: "Dr. Helena Vance", cat: "History", price: "$32.00", rating: "4.7", reviews: "2.1k", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVwnEhqjvNIiujHAPaeaKRPf-15YM0vA9Qox_d96Su8Ki881ZawNFiujfR74CVMuURXTTCQaTOcgSpBt-eRNFHRAHApKICaQpfGUxixFvQHLfCmU49diaFm8NlWfJ4lbWQlYAsFZo7nPw4jEuq26r6G0RX3Byq8AoPvzKDDFceNJdW02wyV0mBnB--KHeMWprtXNi9uTqlUiiJQtPsXvKM6HaKp8ZlEQ2VCYLLD5A2ufcTckn6FEC1SQ_MZhEuzH8OIj8U0viMbLs" },
            { title: "Mindful Flow", author: "Elena Rossi", cat: "Psychology", price: "$21.99", rating: "5.0", reviews: "540", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT5oiN3QDc0kL9JrZT_vH6mfLn9VO6bFnEWa1H549c-_2L6EOZpNZkYNaWwK5Ml1WG8ZytBVmMdsL4lOHyhfdEZ4q2TB67o9lHZBeFPTuJcOaKG84JlCccM2Sf5dFSjO9M0neq2Zg9HdERAN-JFQdd7xUJNgMg3GyI0cdta_OrdnQyD0hZl-LNJsOejetOyMGITVqkHXRcaKEPfHLZF_dv1bsaSZ86g4rHsshLjHxWV-C5K_P2rIdHgqreTttqG8upiAAXcwhp-hY" },
          ].map((book, i) => (
            <div key={i} className="group bg-surface rounded-xl border border-outline-variant overflow-hidden hover:scale-[1.02] transition-all whisper-shadow flex flex-col h-full">
              <div className="p-4 bg-surface-container-low overflow-hidden">
                <img className="w-full aspect-[3/4] object-cover rounded shadow-lg group-hover:rotate-1 transition-transform border border-black/5" alt={book.title} src={book.img} />
              </div>
              <div className="p-card-padding flex flex-col flex-grow">
                <span className="font-label-caps text-label-caps text-primary uppercase mb-2">{book.cat}</span>
                <h3 className="font-card-title text-card-title text-on-background mb-1 line-clamp-2">{book.title}</h3>
                <p className="font-caption text-caption text-on-surface-variant mb-4">{book.author}</p>
                <div className="flex items-center gap-1 mb-6">
                  <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-caption text-caption text-on-background font-medium">{book.rating}</span>
                  <span className="font-caption text-caption text-on-surface-variant ml-1">({book.reviews})</span>
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <span className="font-card-title text-card-title text-primary font-bold">{book.price}</span>
                  <button className="p-2 rounded-full border border-outline-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-surface-container-low py-section-v-space border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-section-title text-section-title text-on-background mb-4">Why Choose BookVerse?</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="mt-6 text-on-surface-variant max-w-2xl mx-auto font-body-main">We provide an unparalleled reading experience with features designed to help you discover, enjoy, and organize your favorite books.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm">
                <span className="material-symbols-outlined text-4xl">local_shipping</span>
              </div>
              <h3 className="font-card-title text-xl font-bold text-on-background mb-3">Lightning Fast Delivery</h3>
              <p className="text-on-surface-variant font-body-main">Get your physical copies delivered to your doorstep within 48 hours, anywhere in the world.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm">
                <span className="material-symbols-outlined text-4xl">workspace_premium</span>
              </div>
              <h3 className="font-card-title text-xl font-bold text-on-background mb-3">Premium Quality</h3>
              <p className="text-on-surface-variant font-body-main">Every book is meticulously checked for quality, ensuring you receive pristine, beautifully bound editions.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm">
                <span className="material-symbols-outlined text-4xl">forum</span>
              </div>
              <h3 className="font-card-title text-xl font-bold text-on-background mb-3">Vibrant Community</h3>
              <p className="text-on-surface-variant font-body-main">Join thousands of readers in discussions, book clubs, and exclusive author Q&A sessions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-section-v-space">
        <div className="text-center mb-16">
          <h2 className="font-section-title text-section-title text-on-background mb-4">What Our Readers Say</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Emily Chen", role: "Avid Reader", quote: "BookVerse completely changed how I discover new authors. The recommendations are spot-on, and the delivery is incredibly fast." },
            { name: "Michael T.", role: "Book Club Host", quote: "The curated collections here are unmatched. We buy all our book club selections from BookVerse. Highly recommended!" },
            { name: "Sarah Jenkins", role: "Literature Student", quote: "I love the clean interface and the seamless reading experience. It's truly a premium sanctuary for book lovers." }
          ].map((testimonial, i) => (
            <div key={i} className="bg-surface p-8 rounded-2xl border border-outline-variant whisper-shadow flex flex-col h-full relative">
              <span className="absolute top-6 left-6 material-symbols-outlined text-6xl text-primary/10">format_quote</span>
              <p className="font-body-main text-on-background italic mb-8 relative z-10 pt-4">"{testimonial.quote}"</p>
              <div className="mt-auto flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-on-background">{testimonial.name}</h4>
                  <p className="text-xs text-on-surface-variant font-label-caps uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-12 mb-section-v-space">
        <div className="bg-surface rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden border border-outline-variant whisper-shadow">
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
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-surface-container-lowest py-section-v-space border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "50k+", label: "Active Readers", icon: "group" },
              { value: "12k+", label: "Total Books", icon: "menu_book" },
              { value: "150+", label: "Authors Joined", icon: "edit_note" },
              { value: "99%", label: "Happy Readers", icon: "sentiment_satisfied" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-2xl text-primary">{stat.icon}</span>
                </div>
                <div className="text-4xl font-bold text-on-background tracking-tight">{stat.value}</div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer is handled by layout.tsx */}
    </>
  );
}
