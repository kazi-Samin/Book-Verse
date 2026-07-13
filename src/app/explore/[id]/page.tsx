"use client";

import { useBook, useBooks } from "@/hooks/useBooks";
import BookCard from "@/components/ui/BookCard";
import { Loader2, Star, ShoppingCart, BookOpen, Clock, ShieldCheck, ArrowLeft, ChevronRight, Package, Heart } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data, isLoading, error } = useBook(id);
  const [isAdding, setIsAdding] = useState(false);
  const [qty, setQty] = useState(1);

  // Related books by same category
  const book = data?.data;
  const { data: relatedData } = useBooks({
    category: book?.category,
    limit: 4,
  });
  const relatedBooks = relatedData?.data?.filter((b) => b._id !== id)?.slice(0, 4);

  if (isLoading) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-primary">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-body-main font-medium">Loading book details...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="max-w-container-max mx-auto px-margin-desktop py-20 text-center">
        <h2 className="text-2xl font-bold text-on-background mb-4">Book not found</h2>
        <p className="text-on-surface-variant mb-8">The book you are looking for doesn&apos;t exist or has been removed.</p>
        <button onClick={() => router.back()} className="px-6 py-2 bg-primary text-on-primary rounded-lg font-medium hover:opacity-90">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-outline-variant bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop py-4">
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-on-background font-medium truncate max-w-[200px]">{book.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-container-max mx-auto px-margin-desktop py-12">
        <motion.div
          className="grid md:grid-cols-12 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Left Col: Image */}
          <div className="md:col-span-4 lg:col-span-4">
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant whisper-shadow sticky top-24">
              <img
                src={book.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuAcF3_0KAP48EMfpEAAiySH-PgtIo-A26xH4vEjXoUduYzyTmGgZiaXcVmJ-JaZYUOIEx-ZJzc1le4JI5_HDZWue-BFNhXECNAeQ1qqimm94aRXLkQphxXltOAIBw6sWOSG5uyeS6j9I2uwDoO_pbB49-MrTQJ2Cvq9RHT1TJVs-kNk2xDBxjwR5-hBQjqN5VU_DAS-myhO0syyzgwHv7iGfjxAEuUzvUj63RQOIuR2kLlI2xyzDjBlr_C8eROdIbXkjlh41lXZOs8"}
                alt={book.title}
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg mb-6"
              />

              {/* Price */}
              <div className="flex items-baseline justify-between mb-6">
                <div className="text-3xl font-bold text-on-background">${book.price.toFixed(2)}</div>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${book.stock > 0 ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-error/10 text-error"}`}>
                  {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
                </span>
              </div>

              {/* Quantity */}
              {book.stock > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-on-surface-variant font-medium">Qty:</span>
                  <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-on-surface-variant hover:bg-surface-container-low transition-colors text-sm font-bold">−</button>
                    <span className="px-4 py-2 text-sm font-semibold text-on-background border-x border-outline-variant min-w-[40px] text-center">{qty}</span>
                    <button onClick={() => setQty(Math.min(book.stock, qty + 1))} className="px-3 py-2 text-on-surface-variant hover:bg-surface-container-low transition-colors text-sm font-bold">+</button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <button
                className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mb-3 disabled:opacity-50"
                onClick={() => setIsAdding(true)}
                disabled={book.stock === 0}
              >
                {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
              </button>
              <button className="w-full py-3.5 border border-outline-variant text-on-background rounded-xl font-bold hover:bg-surface-container-low transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" /> Add to Wishlist
              </button>

              <div className="mt-6 pt-4 border-t border-outline-variant space-y-3">
                <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Secure transaction</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                  <Package className="w-4 h-4 text-primary" />
                  <span>Free delivery on orders over $50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Details */}
          <div className="md:col-span-8 lg:col-span-8">
            {/* Category & Rating */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Link href={`/explore?category=${book.category}`} className="px-3 py-1 bg-primary/10 text-primary rounded-full font-label-caps text-xs uppercase tracking-wider font-bold hover:bg-primary/20 transition-colors">
                {book.category}
              </Link>
              {book.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-tertiary fill-current" />
                  <span className="font-bold text-on-background text-sm">{book.rating}</span>
                  <span className="text-on-surface-variant text-sm">/5</span>
                </div>
              )}
            </div>

            {/* Title & Author */}
            <h1 className="text-3xl md:text-4xl font-bold text-on-background mb-2 leading-tight">
              {book.title}
            </h1>
            <p className="text-lg text-on-surface-variant mb-8">
              by <span className="text-primary font-medium">{book.author}</span>
            </p>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="p-4 bg-surface rounded-xl border border-outline-variant text-center">
                <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">Pages</p>
                <p className="font-bold text-on-background mt-1">342</p>
              </div>
              <div className="p-4 bg-surface rounded-xl border border-outline-variant text-center">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">Est. Read</p>
                <p className="font-bold text-on-background mt-1">11 hrs</p>
              </div>
              <div className="p-4 bg-surface rounded-xl border border-outline-variant text-center">
                <span className="material-symbols-outlined text-2xl text-primary block mx-auto mb-2">translate</span>
                <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">Language</p>
                <p className="font-bold text-on-background mt-1">English</p>
              </div>
            </div>

            {/* ISBN */}
            {book.isbn && (
              <div className="mb-8 p-4 bg-surface rounded-xl border border-outline-variant flex items-center justify-between">
                <span className="text-sm text-on-surface-variant font-medium">ISBN</span>
                <span className="text-sm font-mono text-on-background font-semibold">{book.isbn}</span>
              </div>
            )}

            {/* Synopsis */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-on-background mb-4">Synopsis</h3>
              <div className="text-on-surface-variant leading-relaxed space-y-4">
                <p>{book.description || "No description provided for this book."}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-on-background mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {[book.category, "Bestseller", "Award Winner", "Must Read"].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 text-sm bg-surface-container-low text-on-surface-variant rounded-full border border-outline-variant font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Books */}
        {relatedBooks && relatedBooks.length > 0 && (
          <motion.section
            className="mt-20 pt-12 border-t border-outline-variant"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-2">You may also like</span>
                <h2 className="font-section-title text-2xl font-bold text-on-background">Related Books</h2>
              </div>
              <Link href={`/explore?category=${book.category}`} className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                See more <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {relatedBooks.map((relBook) => (
                <BookCard key={relBook._id} book={relBook} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
