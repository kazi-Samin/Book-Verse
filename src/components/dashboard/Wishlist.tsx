"use client";

import { useState, useEffect } from "react";
import { Heart, Package, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/user/wishlist", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setWishlist(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    await fetch(`/api/user/wishlist/${id}`, { method: 'DELETE', credentials: 'include' });
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="border border-outline-variant/60 rounded-xl p-4 flex flex-col gap-4 relative hover:border-primary/40 transition-colors">
            <button onClick={() => removeFromWishlist(item.id)} className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-error bg-surface rounded-full shadow-sm">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="w-full h-48 bg-surface-container-lowest rounded-lg relative overflow-hidden flex items-center justify-center">
              {item.image ? (
                 <Image src={item.image} alt={item.title} fill className="object-cover" />
              ) : (
                <Package className="w-12 h-12 text-outline-variant" />
              )}
            </div>
            <div>
              <h4 className="font-bold text-on-background">{item.title}</h4>
              <p className="text-sm text-on-surface-variant">{item.author}</p>
              <p className="font-bold text-primary mt-2">${item.price}</p>
            </div>
            <button className="w-full py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors mt-auto">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
