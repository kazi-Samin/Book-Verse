import { IBook } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

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

  return (
    <Link href={`/book/${book._id}`} className="group bg-surface rounded-xl border border-outline-variant overflow-hidden hover:scale-[1.02] transition-all whisper-shadow flex flex-col h-full block">
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
        <div className="mt-auto flex justify-between items-center">
          <span className="font-card-title text-lg text-primary font-black">${book.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="p-2 rounded-full border border-outline-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all z-10"
            title="Add to Cart"
          >
            <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
