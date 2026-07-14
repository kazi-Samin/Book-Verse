"use client";

import { useState } from "react";
import { useBooks, BookFilters } from "@/hooks/useBooks";
import BookCard from "@/components/ui/BookCard";
import BookCardSkeleton from "@/components/ui/BookCardSkeleton";
import { Search, Loader2, BookX, ChevronRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function ExplorePage() {
  const { data: session, isPending } = useSession();
  const [filters, setFilters] = useState<BookFilters>({
    page: 1,
    limit: 12,
    sortBy: "newest",
  });

  const { data, isLoading, error } = useBooks(filters);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    setFilters(prev => ({ ...prev, search, page: 1 }));
  };

  const updateFilter = (key: keyof BookFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const categories = ["Fiction", "Sci-Fi", "Psychology", "History", "Mystery", "Romance", "Biography"];
  const ratings = [4, 3, 2, 1];

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Breadcrumb & Header */}
      <div className="border-b border-outline-variant bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop py-8">
          <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-on-background font-medium">Explore</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold text-on-background tracking-tight">All Books</h1>
            <form onSubmit={handleSearch} className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input 
                name="search"
                placeholder="Search catalog..."
                className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              />
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-desktop py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Professional Left Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div className="flex items-center gap-2 text-on-background font-bold uppercase tracking-wider text-sm mb-6 pb-2 border-b border-outline-variant">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="font-semibold text-on-background mb-4 text-sm uppercase tracking-wide">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="category" 
                  checked={!filters.category} 
                  onChange={() => updateFilter("category", undefined)}
                  className="w-4 h-4 text-primary focus:ring-primary border-outline-variant rounded cursor-pointer"
                />
                <span className={`text-sm ${!filters.category ? 'text-on-background font-medium' : 'text-on-surface-variant group-hover:text-on-background'} transition-colors`}>All Categories</span>
              </label>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={filters.category === cat} 
                    onChange={() => updateFilter("category", cat)}
                    className="w-4 h-4 text-primary focus:ring-primary border-outline-variant rounded cursor-pointer"
                  />
                  <span className={`text-sm ${filters.category === cat ? 'text-on-background font-medium' : 'text-on-surface-variant group-hover:text-on-background'} transition-colors`}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold text-on-background mb-4 text-sm uppercase tracking-wide">Price</h3>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                <input 
                  type="number" 
                  placeholder="Min" 
                  onChange={(e) => updateFilter("minPrice", e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full pl-7 pr-3 py-2 bg-surface border border-outline-variant rounded-md text-sm focus:outline-none focus:border-primary transition-colors" 
                />
              </div>
              <span className="text-on-surface-variant">-</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  onChange={(e) => updateFilter("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full pl-7 pr-3 py-2 bg-surface border border-outline-variant rounded-md text-sm focus:outline-none focus:border-primary transition-colors" 
                />
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="font-semibold text-on-background mb-4 text-sm uppercase tracking-wide">Minimum Rating</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="rating" 
                  checked={!filters.rating} 
                  onChange={() => updateFilter("rating", undefined)}
                  className="w-4 h-4 text-primary focus:ring-primary border-outline-variant rounded cursor-pointer"
                />
                <span className={`text-sm ${!filters.rating ? 'text-on-background font-medium' : 'text-on-surface-variant group-hover:text-on-background'} transition-colors`}>Any Rating</span>
              </label>
              {ratings.map((rating) => (
                <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="rating" 
                    checked={filters.rating === rating} 
                    onChange={() => updateFilter("rating", rating)}
                    className="w-4 h-4 text-primary focus:ring-primary border-outline-variant rounded cursor-pointer"
                  />
                  <span className={`text-sm ${filters.rating === rating ? 'text-on-background font-medium' : 'text-on-surface-variant group-hover:text-on-background'} flex items-center gap-1 transition-colors`}>
                    {rating} <span className="material-symbols-outlined text-[16px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> & Up
                  </span>
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {isPending ? (
            <div className="w-full py-32 flex flex-col items-center justify-center text-primary">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="font-medium text-sm">Checking access...</p>
            </div>
          ) : !session ? (
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden flex items-center justify-center border border-outline-variant">
              {/* Blurred background pattern */}
              <div className="absolute inset-0 bg-surface-container-low opacity-50" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
              <div className="absolute inset-0 backdrop-blur-sm"></div>
              
              <div className="relative z-10 max-w-lg text-center p-8 bg-surface/80 backdrop-blur-xl border border-outline-variant rounded-3xl shadow-2xl mx-4">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-3xl">lock</span>
                </div>
                <h3 className="text-3xl font-bold text-on-background mb-4 tracking-tight">Unlock the Library</h3>
                <p className="text-on-surface-variant font-medium mb-8 leading-relaxed">
                  Join BookVerse today to browse our full catalog of 150+ premium books, build your wishlist, and read exclusive content.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/login" className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20">
                    Sign In
                  </Link>
                  <Link href="/register" className="px-8 py-3 bg-surface border border-outline-variant text-on-background rounded-xl font-bold hover:bg-surface-container-low transition-all shadow-sm">
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Top Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-center bg-surface border border-outline-variant rounded-md p-4 mb-6">
                <p className="text-sm text-on-surface-variant font-medium mb-4 sm:mb-0">
                  {isLoading ? "Loading..." : data?.pagination ? `Showing ${(data.pagination.page - 1) * data.pagination.limit + 1} - ${Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} of ${data.pagination.total} results` : "0 results"}
                </p>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <label className="text-sm font-medium text-on-surface-variant whitespace-nowrap">Sort by:</label>
                  <select 
                    value={filters.sortBy}
                    onChange={(e) => updateFilter("sortBy", e.target.value)}
                    className="w-full sm:w-auto pl-3 pr-8 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-md text-sm text-on-background focus:outline-none focus:border-primary cursor-pointer transition-colors"
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating_desc">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Book Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <BookCardSkeleton key={i} />
                  ))}
                </div>
              ) : error ? (
                <div className="w-full py-20 flex flex-col items-center justify-center text-error bg-error-container/20 border border-error/20 rounded-md">
                  <BookX className="w-10 h-10 mb-3 opacity-80" />
                  <p className="font-medium text-sm">Failed to load catalog. Please try again.</p>
                </div>
              ) : data?.data && data.data.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.data.map((book) => (
                      <BookCard key={book._id} book={book} />
                    ))}
                  </div>
                  
                  {/* Professional Pagination */}
                  {data.pagination && data.pagination.totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                      <button 
                        disabled={data.pagination.page === 1}
                        onClick={() => updateFilter("page", filters.page! - 1)}
                        className="px-4 py-2 border border-outline-variant rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-container-low transition-colors text-sm font-medium text-on-surface-variant hover:text-on-background"
                      >
                        Prev
                      </button>
                      {Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          onClick={() => updateFilter("page", p)}
                          className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                            data.pagination!.page === p 
                            ? "bg-primary text-on-primary border border-primary" 
                            : "border border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-on-background"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                      <button 
                        disabled={data.pagination.page === data.pagination.totalPages}
                        onClick={() => updateFilter("page", filters.page! + 1)}
                        className="px-4 py-2 border border-outline-variant rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-container-low transition-colors text-sm font-medium text-on-surface-variant hover:text-on-background"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full py-32 flex flex-col items-center justify-center text-on-surface-variant bg-surface border border-outline-variant rounded-md">
                  <BookX className="w-12 h-12 opacity-30 mb-4" />
                  <h3 className="text-lg font-bold text-on-background mb-2">No results found</h3>
                  <p className="text-sm max-w-sm text-center mb-6">We couldn't find any books matching your current filters. Try adjusting your search or removing some filters.</p>
                  <button 
                    onClick={() => setFilters({ page: 1, limit: 12, sortBy: "newest" })}
                    className="px-6 py-2 bg-surface-container-low border border-outline-variant text-on-background rounded-md text-sm font-medium hover:bg-outline-variant/30 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
