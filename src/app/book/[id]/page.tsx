"use client";

import { useBook } from "@/hooks/useBooks";
import { useCart } from "@/hooks/useCart";
import { useSession } from "@/lib/auth-client";
import { ArrowLeft, BookOpen, CheckCircle, Package, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, use, useEffect } from "react";
import { toast } from "react-hot-toast";
import BookCard from "@/components/ui/BookCard";

// Mock static books fallback
const staticBooks = {
  "the-silent-observer": { title: "The Silent Observer", author: "Sarah J. Wellington", category: "Fiction", price: 24.00, rating: "4.8", reviews: "1.2k", coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop" },
  "future-pulse": { title: "Future Pulse", author: "Marcus Thorne", category: "Sci-Fi", price: 19.50, rating: "4.9", reviews: "850", coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop" },
  "echoes-of-history": { title: "Echoes of History", author: "Dr. Helena Vance", category: "History", price: 32.00, rating: "4.7", reviews: "2.1k", coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop" },
  "mindful-flow": { title: "Mindful Flow", author: "Elena Rossi", category: "Psychology", price: 21.99, rating: "5.0", reviews: "540", coverImage: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=600&auto=format&fit=crop" },
  "whispers-in-the-dark": { title: "Whispers in the Dark", author: "Liam Cross", category: "Mystery", price: 18.99, rating: "4.9", reviews: "3.4k", coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop" },
  "the-last-algorithm": { title: "The Last Algorithm", author: "Priya Sharma", category: "Sci-Fi", price: 27.00, rating: "4.8", reviews: "1.8k", coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=600&auto=format&fit=crop" },
  "beneath-the-surface": { title: "Beneath the Surface", author: "Olivia Hart", category: "Psychology", price: 22.50, rating: "4.9", reviews: "980", coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop" },
  "empire-of-dust": { title: "Empire of Dust", author: "James Aldrin", category: "History", price: 29.99, rating: "4.7", reviews: "2.5k", coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop" },
};

export default function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const { data: response, isLoading: queryLoading, error } = useBook(id);
  
  const { addItem } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || queryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  let book: any = response?.data;
  let isStatic = false;
  
  // Fallback to static books if API fails
  if (!book && staticBooks[id as keyof typeof staticBooks]) {
    book = staticBooks[id as keyof typeof staticBooks];
    book._id = id;
    isStatic = true;
  }

  if (!book) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Book not found</h1>
        <p className="text-on-surface-variant mb-8">The book you're looking for doesn't exist or has been removed.</p>
        <Link href="/explore" className="px-6 py-3 bg-primary text-on-primary rounded-lg font-bold">
          Back to Explore
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!session) {
      toast.error("Please log in to add books to your cart.");
      router.push(`/login`);
      return;
    }
    
    addItem({
      _id: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      coverImage: book.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"
    });
    toast.success("Added to cart!");
  };

  // Mock related books
  const relatedBooks = [
    { _id: "64728", title: "The Art of Programming", author: "Donald Knuth", category: book.category, price: 45.00, rating: 5, reviews: 200, coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop" },
    { _id: "78219", title: "Clean Code", author: "Robert C. Martin", category: book.category, price: 32.50, rating: 4.8, reviews: 1500, coverImage: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=600&auto=format&fit=crop" },
    { _id: "19238", title: "Design Patterns", author: "Gang of Four", category: book.category, price: 38.00, rating: 4.6, reviews: 900, coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop" },
    { _id: "55829", title: "Refactoring", author: "Martin Fowler", category: book.category, price: 42.00, rating: 4.9, reviews: 1100, coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Breadcrumb Header */}
      <div className="border-b border-outline-variant bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop py-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to previous
          </button>
        </div>
      </div>

      <main className="max-w-container-max mx-auto px-margin-desktop py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Book Cover */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 relative group bg-surface-container-low">
              <img 
                src={book.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"} 
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-8 flex flex-col h-full">
            <div className="mb-2">
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-widest">{book.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-on-background mt-4 mb-2 leading-tight tracking-tight">
              {book.title}
            </h1>
            
            <p className="text-xl text-on-surface-variant font-medium mb-6">By <span className="text-on-background">{book.author}</span></p>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-outline-variant/40">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-5 h-5 ${star <= Math.floor(parseFloat(book.rating || "5")) ? 'text-tertiary fill-tertiary' : 'text-outline-variant'}`} />
                ))}
                <span className="font-bold text-on-background ml-2">{book.rating || "5.0"}</span>
                <span className="text-on-surface-variant text-sm ml-1">({book.reviews || "150"} reviews)</span>
              </div>
              <div className="w-px h-6 bg-outline-variant/50"></div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-medium">Paperback</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 p-6 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-sm">
              <div>
                <p className="text-on-surface-variant text-sm font-medium mb-1">Our Price</p>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-primary">${typeof book.price === 'number' ? book.price.toFixed(2) : parseFloat(book.price.replace('$', '')).toFixed(2)}</span>
                  <span className="text-on-surface-variant text-sm line-through mb-1.5">${(book.price * 1.2).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:w-1/2">
                <button 
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-primary/25 flex items-center justify-center gap-2 text-lg"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
              </div>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="flex flex-col items-center justify-center p-4 bg-surface rounded-xl border border-outline-variant/30 text-center">
                <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
                <span className="text-xs font-bold text-on-background">In Stock</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-surface rounded-xl border border-outline-variant/30 text-center">
                <Truck className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs font-bold text-on-background">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-surface rounded-xl border border-outline-variant/30 text-center">
                <ShieldCheck className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs font-bold text-on-background">Secure Pay</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-surface rounded-xl border border-outline-variant/30 text-center">
                <Package className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs font-bold text-on-background">Easy Returns</span>
              </div>
            </div>

            {/* Synopsis */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-on-background mb-4">Synopsis</h3>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                Dive into the captivating world of {book.title}. This highly acclaimed novel by {book.author} explores profound themes and offers a compelling narrative that keeps readers on the edge of their seats from the first page to the last. Perfect for fans of {book.category}, this edition features exclusive insights and beautifully crafted prose.
                <br/><br/>
                Winner of multiple literary awards, this book is widely recognized as a modern masterpiece in its genre. It continues to inspire and provoke thought among critics and casual readers alike.
              </p>
            </div>

            {/* Book Details Info Grid */}
            <div>
              <h3 className="text-2xl font-bold text-on-background mb-4">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm bg-surface p-6 rounded-2xl border border-outline-variant/40">
                <div className="flex justify-between py-2 border-b border-outline-variant/30">
                  <span className="text-on-surface-variant">Publisher</span>
                  <span className="font-medium text-on-background">Penguin Random House</span>
                </div>
                <div className="flex justify-between py-2 border-b border-outline-variant/30">
                  <span className="text-on-surface-variant">Publication Date</span>
                  <span className="font-medium text-on-background">October 12, 2023</span>
                </div>
                <div className="flex justify-between py-2 border-b border-outline-variant/30">
                  <span className="text-on-surface-variant">Pages</span>
                  <span className="font-medium text-on-background">384 pages</span>
                </div>
                <div className="flex justify-between py-2 border-b border-outline-variant/30">
                  <span className="text-on-surface-variant">ISBN-13</span>
                  <span className="font-medium text-on-background">978-{Math.floor(1000000000 + Math.random() * 9000000000)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-outline-variant/30">
                  <span className="text-on-surface-variant">Language</span>
                  <span className="font-medium text-on-background">English</span>
                </div>
                <div className="flex justify-between py-2 border-b border-outline-variant/30">
                  <span className="text-on-surface-variant">Dimensions</span>
                  <span className="font-medium text-on-background">5.5 x 1.2 x 8.2 inches</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Related Books Section */}
      <section className="bg-surface-container-lowest py-16 border-t border-outline-variant/40 mt-8">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="mb-10">
            <h2 className="font-section-title text-3xl text-on-background">Customers also bought</h2>
            <div className="w-16 h-1 bg-primary mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedBooks.map((relatedBook: any) => (
              <BookCard key={relatedBook._id} book={relatedBook} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
