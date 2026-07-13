import { IBook } from "@/types";

interface BookCardProps {
  book: IBook;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="group bg-surface rounded-xl border border-outline-variant overflow-hidden hover:scale-[1.02] transition-all whisper-shadow flex flex-col h-full">
      <div className="p-4 bg-surface-container-low overflow-hidden">
        <img 
          className="w-full aspect-[3/4] object-cover rounded shadow-lg group-hover:rotate-1 transition-transform border border-black/5" 
          alt={book.title} 
          src={book.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuAcF3_0KAP48EMfpEAAiySH-PgtIo-A26xH4vEjXoUduYzyTmGgZiaXcVmJ-JaZYUOIEx-ZJzc1le4JI5_HDZWue-BFNhXECNAeQ1qqimm94aRXLkQphxXltOAIBw6sWOSG5uyeS6j9I2uwDoO_pbB49-MrTQJ2Cvq9RHT1TJVs-kNk2xDBxjwR5-hBQjqN5VU_DAS-myhO0syyzgwHv7iGfjxAEuUzvUj63RQOIuR2kLlI2xyzDjBlr_C8eROdIbXkjlh41lXZOs8"} 
        />
      </div>
      <div className="p-card-padding flex flex-col flex-grow">
        <span className="font-label-caps text-label-caps text-primary uppercase mb-2">{book.category}</span>
        <h3 className="font-card-title text-card-title text-on-background mb-1 line-clamp-2">{book.title}</h3>
        <p className="font-caption text-caption text-on-surface-variant mb-4">{book.author}</p>
        <div className="flex items-center gap-1 mb-6">
          <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="font-caption text-caption text-on-background font-medium">{book.rating || "New"}</span>
          <span className="font-caption text-caption text-on-surface-variant ml-1">
            ({book.rating ? "1.2k" : "0"})
          </span>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <span className="font-card-title text-card-title text-primary font-bold">${book.price.toFixed(2)}</span>
          <button className="p-2 rounded-full border border-outline-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all">
            <span className="material-symbols-outlined">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
