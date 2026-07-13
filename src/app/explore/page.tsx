"use client";

import { useState } from "react";
import { useBooks, BookFilters } from "@/hooks/useBooks";
import BookCard from "@/components/ui/BookCard";
import { Search, Filter, Loader2, BookX } from "lucide-react";

export default function ExplorePage() {
  const [filters, setFilters] = useState<BookFilters>({
    page: 1,
    limit: 12,
  });

  const { data, isLoading, error } = useBooks(filters);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    setFilters(prev => ({ ...prev, search, page: 1 }));
  };

  const handleCategory = (category: string) => {
    setFilters(prev => ({ ...prev, category: category === "All" ? undefined : category, page: 1 }));
  };

  const categories = ["All", "Fiction", "Sci-Fi", "Psychology", "History", "Mystery"];

  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-12">
      {/* Header & Search */}
      <div className="mb-12">
        <h1 className="font-section-title text-4xl font-bold text-on-background mb-4">Explore Our Collection</h1>
        <p className="font-body-main text-on-surface-variant max-w-2xl mb-8">
          Find your next favorite story. Use the filters below to narrow down our extensive library by genre, price, or rating.
        </p>
        
        <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
            <input 
              name="search"
              placeholder="Search by title or author..."
              className="w-full pl-12 pr-4 py-4 bg-surface rounded-xl border border-outline-variant focus:outline-none focus:border-primary transition-colors whisper-shadow"
            />
          </div>
          <button type="submit" className="px-8 py-4 bg-primary text-on-primary rounded-xl font-body-main font-semibold hover:opacity-90 transition-all active:scale-95">
            Search
          </button>
        </form>
      </div>

      <div className="grid lg:grid-cols-4 gap-gutter">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="font-label-caps text-label-caps text-on-background uppercase tracking-widest mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Categories
            </h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`text-left px-4 py-2 rounded-lg font-body-main transition-colors ${
                    (filters.category === cat || (cat === "All" && !filters.category))
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Book Grid */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="w-full py-20 flex flex-col items-center justify-center text-primary">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="font-body-main font-medium">Loading books...</p>
            </div>
          ) : error ? (
            <div className="w-full py-20 flex flex-col items-center justify-center text-error bg-error-container/50 rounded-xl">
              <p className="font-body-main font-medium">Failed to load books. Please try again.</p>
            </div>
          ) : data?.data && data.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {data.data.map(book => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
              
              {/* Pagination */}
              {data.pagination && data.pagination.totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  <button 
                    disabled={data.pagination.page === 1}
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page! - 1 }))}
                    className="px-4 py-2 border border-outline-variant rounded-lg disabled:opacity-50 hover:bg-surface-container-low transition-colors font-medium text-on-surface-variant"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 font-medium text-on-background">
                    Page {data.pagination.page} of {data.pagination.totalPages}
                  </span>
                  <button 
                    disabled={data.pagination.page === data.pagination.totalPages}
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page! + 1 }))}
                    className="px-4 py-2 border border-outline-variant rounded-lg disabled:opacity-50 hover:bg-surface-container-low transition-colors font-medium text-on-surface-variant"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center text-on-surface-variant">
              <BookX className="w-16 h-16 mb-4 opacity-50" />
              <h3 className="font-section-title text-2xl font-medium text-on-background mb-2">No books found</h3>
              <p className="font-body-main">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
