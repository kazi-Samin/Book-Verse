"use client";

import { useState, useEffect } from "react";
import { Heart, Package, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { axiosInstance as api } from "@/lib/axios";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/user/wishlist");
      if (res.data) {
        setWishlist(res.data.data || res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (bookId: string) => {
    setWishlist((prev) => prev.filter((item) => item.bookId?._id !== bookId));
    try {
      await api.delete(`/user/wishlist/${bookId}`);
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (wishlist.length === 0) {
    return (
      <div className="bg-surface rounded-2xl p-12 border border-outline-variant shadow-sm text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
          <Heart className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-on-background mb-2">Your wishlist is empty</h3>
        <p className="text-on-surface-variant max-w-md mx-auto mb-8">
          Save items you love to your wishlist and review them anytime. Discover new favorites today.
        </p>
        <Link href="/explore" className="px-6 py-3 bg-primary text-on-primary font-bold rounded-full hover:bg-primary/90 transition-colors">
          Explore Books
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl p-8 border border-outline-variant shadow-sm">
      <h3 className="text-2xl font-bold text-on-background mb-6">Your Wishlist</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          const book = item.bookId;
          if (!book) return null; // Handle case where book was deleted from db

          return (
            <div key={item._id} className="bg-surface border border-outline-variant/60 rounded-xl p-4 flex flex-col relative hover:border-primary/40 hover:shadow-md transition-all group">
              <button 
                onClick={() => removeFromWishlist(book._id)} 
                className="absolute top-6 right-6 p-2 text-on-surface-variant hover:text-error bg-surface/80 backdrop-blur-sm rounded-full shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <Link href={`/explore/${book._id}`} className="block flex-1">
                <div className="w-full aspect-[3/4] bg-surface-container-lowest rounded-lg relative overflow-hidden flex items-center justify-center mb-4">
                  {book.coverImage ? (
                    <Image src={book.coverImage} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <Package className="w-12 h-12 text-outline-variant" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-on-background line-clamp-1">{book.title}</h4>
                  <p className="text-sm text-on-surface-variant line-clamp-1">{book.author}</p>
                  <p className="font-bold text-primary mt-2">${book.price}</p>
                </div>
              </Link>
              
              <button className="w-full mt-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors mt-auto flex justify-center items-center gap-2">
                <Package className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
