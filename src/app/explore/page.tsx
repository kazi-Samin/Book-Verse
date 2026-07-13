"use client";

import { useState } from "react";
import { useBooks, BookFilters } from "@/hooks/useBooks";
import BookCard from "@/components/ui/BookCard";
import { Search, Filter, Loader2, BookX, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function ExplorePage() {
  const [filters, setFilters] = useState<BookFilters>({
    page: 1,
    limit: 12,
  });
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, sortBy: e.target.value as any, page: 1 }));
  };

  const categories = ["All", "Fiction", "Sci-Fi", "Psychology", "History", "Mystery", "Romance", "Biography"];

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Hero Section */}
      <section className="bg-surface-container-lowest pt-20 pb-16 px-margin-desktop border-b border-outline-variant relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-48 -mb-48 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-hero-lg-mobile text-5xl md:text-6xl font-bold text-on-background mb-6 tracking-tight">
            Discover Your Next <span className="text-primary italic">Adventure</span>
          </h1>
          <p className="font-body-main text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Explore thousands of meticulously curated books. From timeless classics to modern masterpieces, your sanctuary awaits.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto flex items-center group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-on-surface-variant group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              name="search"
              placeholder="Search by title, author, or ISBN..."
              className="w-full pl-16 pr-40 py-5 bg-surface rounded-full border border-outline-variant focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg shadow-sm hover:shadow-md"
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 px-8 bg-primary text-on-primary rounded-full font-body-main font-semibold hover:opacity-90 transition-all active:scale-95 shadow-md">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-12">
        
        {/* Horizontal Filter Bar */}
        <div className="bg-surface rounded-2xl p-4 border border-outline-variant whisper-shadow mb-10 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-24 z-40">
          
          {/* Category Pills (Scrollable) */}
          <div className="flex-grow w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar flex gap-2 items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full font-body-main text-sm font-semibold transition-all duration-300 ${
                  (filters.category === cat || (cat === "All" && !filters.category))
                    ? "bg-primary text-on-primary shadow-md shadow-primary/20 scale-105"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-outline-variant/30 hover:text-on-background"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-px h-10 bg-outline-variant hidden md:block mx-2"></div>

          {/* Sort & Advanced Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="relative">
              <select 
                onChange={handleSort}
                className="appearance-none pl-4 pr-10 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant text-on-background font-medium focus:outline-none focus:border-primary cursor-pointer hover:bg-outline-variant/20 transition-colors"
              >
                <option value="">Sort by: Recommended</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Top Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
            </div>

            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`p-2.5 rounded-xl border transition-colors flex items-center justify-center ${isFilterOpen ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container-low border-outline-variant text-on-background hover:bg-outline-variant/20'}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Filters */}
        {isFilterOpen && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
            <h3 className="font-section-title text-lg font-bold text-on-background mb-4">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-3">Price Range</label>
                <div className="flex items-center gap-3">
                  <input type="number" placeholder="Min $" className="w-full px-4 py-2 bg-surface rounded-lg border border-outline-variant focus:border-primary outline-none transition-colors" />
                  <span className="text-on-surface-variant">-</span>
                  <input type="number" placeholder="Max $" className="w-full px-4 py-2 bg-surface rounded-lg border border-outline-variant focus:border-primary outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-3">Minimum Rating</label>
                <select className="w-full px-4 py-2 bg-surface rounded-lg border border-outline-variant focus:border-primary outline-none transition-colors">
                  <option value="">Any Rating</option>
                  <option value="4">4 Stars & Above</option>
                  <option value="3">3 Stars & Above</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Book Grid Area */}
        <div className="w-full">
          {isLoading ? (
            <div className="w-full py-32 flex flex-col items-center justify-center text-primary">
              <Loader2 className="w-12 h-12 animate-spin mb-6" />
              <p className="font-body-main font-semibold text-lg animate-pulse">Curating your collection...</p>
            </div>
          ) : error ? (
            <div className="w-full py-20 flex flex-col items-center justify-center text-error bg-error-container/50 rounded-2xl border border-error/20">
              <BookX className="w-12 h-12 mb-4" />
              <h3 className="font-section-title text-xl font-bold mb-2">Oops! Something went wrong</h3>
              <p className="font-body-main font-medium opacity-80">Failed to load books. Please check your connection and try again.</p>
            </div>
          ) : data?.data && data.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                {data.data.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
              
              {/* Pagination */}
              {data.pagination && data.pagination.totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-4 border-t border-outline-variant pt-8">
                  <button 
                    disabled={data.pagination.page === 1}
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page! - 1 }))}
                    className="px-6 py-2.5 border border-outline-variant rounded-full disabled:opacity-50 hover:bg-surface-container-low hover:border-primary transition-all font-semibold text-on-surface-variant hover:text-primary active:scale-95"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 font-semibold text-on-background bg-surface-container-lowest rounded-full border border-outline-variant shadow-sm">
                    {data.pagination.page} / {data.pagination.totalPages}
                  </span>
                  <button 
                    disabled={data.pagination.page === data.pagination.totalPages}
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page! + 1 }))}
                    className="px-6 py-2.5 border border-outline-variant rounded-full disabled:opacity-50 hover:bg-surface-container-low hover:border-primary transition-all font-semibold text-on-surface-variant hover:text-primary active:scale-95"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="w-full py-32 flex flex-col items-center justify-center text-on-surface-variant bg-surface-container-lowest rounded-3xl border border-outline-variant border-dashed">
              <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6 shadow-sm">
                <BookX className="w-10 h-10 opacity-50" />
              </div>
              <h3 className="font-section-title text-3xl font-bold text-on-background mb-3">No books found</h3>
              <p className="font-body-main text-lg max-w-md text-center">We couldn't find any books matching your criteria. Try adjusting your filters or search term.</p>
              <button 
                onClick={() => {
                  setFilters({ page: 1, limit: 12 });
                  const searchInput = document.querySelector('input[name="search"]') as HTMLInputElement;
                  if (searchInput) searchInput.value = "";
                }}
                className="mt-8 px-8 py-3 bg-primary text-on-primary rounded-full font-bold hover:opacity-90 transition-opacity active:scale-95"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
