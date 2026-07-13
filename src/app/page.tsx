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

      {/* Statistics Section */}
      <section className="bg-primary py-section-v-space text-on-primary overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px] -ml-48 -mb-48"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter text-center">
            <div>
              <div className="text-5xl font-bold mb-2">50k+</div>
              <p className="font-label-caps text-label-caps opacity-80">Active Readers</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">12k+</div>
              <p className="font-label-caps text-label-caps opacity-80">Total Books</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">150+</div>
              <p className="font-label-caps text-label-caps opacity-80">Authors Joined</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99%</div>
              <p className="font-label-caps text-label-caps opacity-80">Happy Readers</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer is handled by layout.tsx */}
    </>
  );
}
