import { IBook } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { axiosInstance as api } from "@/lib/axios";

interface BookCardProps {
  book: IBook;
}

export default function BookCard({ book }: BookCardProps) {
  const { addItem } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please log in to add books to your cart.");
      router.push(`/login`);
      return;
    }

    const isAdmin = session.user.email === "kazisamin0173@gmail.com" || session.user.role === "admin";
    if (isAdmin) {
      toast.error("Admins cannot place orders.");
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

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please log in to buy books.");
      router.push(`/login`);
      return;
    }
    const isAdmin = session.user.email === "kazisamin0173@gmail.com" || session.user.role === "admin";
    if (isAdmin) {
      toast.error("Admins cannot place orders.");
      return;
    }
    // Save as a direct-buy item so checkout can read it without touching the cart
    const directItem = {
      _id: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      quantity: 1,
      coverImage: book.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"
    };
    localStorage.setItem('bookverse-direct-buy', JSON.stringify(directItem));
    router.push("/checkout?direct=true");
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please log in to add to wishlist.");
      router.push(`/login`);
      return;
    }
    try {
      const res = await api.post("/user/wishlist", { bookId: book._id });
      if (res.data?.success) {
        toast.success("Added to wishlist!");
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        toast.error("Book already in wishlist!");
      } else {
        toast.error("Failed to add to wishlist");
      }
    }
  };

  return (
    <Link href={`/book/${book._id}`} className="group relative bg-surface rounded-xl border border-outline-variant overflow-hidden hover:scale-[1.02] transition-all whisper-shadow flex flex-col h-full block">
      <button 
        onClick={handleAddToWishlist} 
        className="absolute top-3 right-3 z-20 p-2 bg-background/80 backdrop-blur-md rounded-full shadow-sm border border-outline-variant/30 hover:bg-primary hover:text-on-primary hover:border-primary transition-all text-on-surface-variant flex items-center justify-center group/btn"
        title="Add to Wishlist"
      >
        <span className="material-symbols-outlined text-[18px] group-hover/btn:scale-110 transition-transform">favorite</span>
      </button>
      <div className="p-4 bg-surface-container-low overflow-hidden">
        <img 
          className="w-full aspect-[4/5] object-cover rounded shadow-lg group-hover:rotate-1 transition-transform border border-black/5" 
          alt={book.title} 
          src={book.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"} 
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <span className="font-label-caps text-[10px] text-primary uppercase mb-1.5 tracking-wider font-bold">{book.category}</span>
        <h3 className="font-card-title text-lg font-bold text-on-background mb-1 line-clamp-2 leading-tight">{book.title}</h3>
        <p className="font-caption text-[13px] text-on-surface-variant mb-3">{book.author}</p>
        <div className="flex items-center gap-1 mb-5">
          <span className="material-symbols-outlined text-tertiary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="font-caption text-[13px] text-on-background font-medium">{book.rating || "New"}</span>
          <span className="font-caption text-[13px] text-on-surface-variant ml-1">
            ({book.rating ? "1.2k" : "0"})
          </span>
        </div>
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-card-title text-lg text-primary font-black">${book.price.toFixed(2)}</span>
          </div>
          <div className="flex gap-2 w-full z-10">
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-2 px-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors text-[13px] font-bold flex items-center justify-center gap-1"
              title="Add to Cart"
            >
              <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              Add
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 py-2 px-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors text-[13px] font-bold flex items-center justify-center"
              title="Buy Now"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
