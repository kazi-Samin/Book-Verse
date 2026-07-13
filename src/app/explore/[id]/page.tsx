"use client";

import { useBook } from "@/hooks/useBooks";
import { Loader2, Star, ShoppingCart, BookOpen, Clock, ShieldCheck, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data, isLoading, error } = useBook(id);
  const [isAdding, setIsAdding] = useState(false);

  if (isLoading) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-primary">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-body-main font-medium">Loading book details...</p>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="max-w-container-max mx-auto px-margin-desktop py-20 text-center">
        <h2 className="text-2xl font-bold text-on-background mb-4">Book not found</h2>
        <p className="text-on-surface-variant mb-8">The book you are looking for doesn't exist or has been removed.</p>
        <button onClick={() => router.back()} className="px-6 py-2 bg-primary text-on-primary rounded-lg font-medium hover:opacity-90">
          Go Back
        </button>
      </div>
    );
  }

  const book = data.data;

  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-12">
      <Link href="/explore" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-8 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Explore
      </Link>

      <div className="grid md:grid-cols-12 gap-12">
        {/* Left Col: Image */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant whisper-shadow sticky top-28">
            <img 
              src={book.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuAcF3_0KAP48EMfpEAAiySH-PgtIo-A26xH4vEjXoUduYzyTmGgZiaXcVmJ-JaZYUOIEx-ZJzc1le4JI5_HDZWue-BFNhXECNAeQ1qqimm94aRXLkQphxXltOAIBw6sWOSG5uyeS6j9I2uwDoO_pbB49-MrTQJ2Cvq9RHT1TJVs-kNk2xDBxjwR5-hBQjqN5VU_DAS-myhO0syyzgwHv7iGfjxAEuUzvUj63RQOIuR2kLlI2xyzDjBlr_C8eROdIbXkjlh41lXZOs8"} 
              alt={book.title}
              className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg mb-6"
            />
            <button 
              className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-lg hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md shadow-primary/20"
              onClick={() => setIsAdding(true)}
            >
              {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
            </button>
            <p className="text-center font-caption text-on-surface-variant mt-4 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Secure transaction
            </p>
          </div>
        </div>

        {/* Right Col: Details */}
        <div className="md:col-span-8 lg:col-span-9">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-label-caps text-xs uppercase tracking-wider font-bold">
              {book.category}
            </span>
            <div className="flex items-center gap-1 text-tertiary">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-on-background">{book.rating || "New"}</span>
              <span className="text-on-surface-variant text-sm">(124 reviews)</span>
            </div>
          </div>

          <h1 className="font-hero-lg-mobile md:text-5xl font-bold text-on-background mb-2">
            {book.title}
          </h1>
          <p className="text-xl text-on-surface-variant font-medium mb-8">
            by <span className="text-primary hover:underline cursor-pointer">{book.author}</span>
          </p>

          <div className="text-4xl font-bold text-on-background mb-8">
            ${book.price.toFixed(2)}
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="p-4 bg-surface rounded-xl border border-outline-variant flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-secondary" />
              <div>
                <p className="font-label-caps text-xs text-on-surface-variant uppercase">Pages</p>
                <p className="font-bold text-on-background">342</p>
              </div>
            </div>
            <div className="p-4 bg-surface rounded-xl border border-outline-variant flex items-center gap-4">
              <Clock className="w-8 h-8 text-secondary" />
              <div>
                <p className="font-label-caps text-xs text-on-surface-variant uppercase">Est. Read Time</p>
                <p className="font-bold text-on-background">11 hrs</p>
              </div>
            </div>
            <div className="p-4 bg-surface rounded-xl border border-outline-variant flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-secondary" />
              <div>
                <p className="font-label-caps text-xs text-on-surface-variant uppercase">Stock Status</p>
                <p className={`font-bold ${book.stock > 0 ? "text-success" : "text-error"}`}>
                  {book.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-section-title text-2xl font-bold text-on-background mb-4">Synopsis</h3>
            <div className="prose prose-lg text-on-surface-variant max-w-none">
              <p>{book.description || "No description provided for this book."}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
