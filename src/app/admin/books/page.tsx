"use client";

import { useBooks, useDeleteBook } from "@/hooks/useBooks";
import { Loader2, Plus, Edit, Trash2, Search, BookX } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ManageBooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useBooks({ search: searchTerm, limit: 50 });
  const deleteMutation = useDeleteBook();
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      if (!session || session.user.role !== "admin") {
        router.replace("/");
      }
    }
  }, [session, isPending, router]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-section-title text-4xl font-bold text-on-background mb-2">Manage Books</h1>
          <p className="font-body-main text-on-surface-variant">View, edit, or remove books from the library.</p>
        </div>
        <Link 
          href="/admin/books/new" 
          className="px-6 py-3 bg-primary text-on-primary rounded-lg font-body-main font-semibold hover:opacity-90 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add New Book
        </Link>
      </div>

      <div className="bg-surface rounded-xl border border-outline-variant whisper-shadow overflow-hidden">
        <div className="p-4 border-b border-outline-variant bg-surface-container-low flex items-center gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface rounded-lg border border-outline-variant focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant">
                <th className="p-4 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">Book</th>
                <th className="p-4 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">Author</th>
                <th className="p-4 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">Category</th>
                <th className="p-4 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">Price</th>
                <th className="p-4 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">Stock</th>
                <th className="p-4 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-primary">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : !data?.data || data.data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-on-surface-variant">
                    <BookX className="w-12 h-12 opacity-50 mx-auto mb-4" />
                    <p className="font-medium text-on-background">No books found.</p>
                  </td>
                </tr>
              ) : (
                data.data.map((book) => (
                  <tr key={book._id} className="border-b border-outline-variant hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={book.coverImage} alt={book.title} className="w-10 h-14 object-cover rounded shadow-sm" />
                        <span className="font-bold text-on-background line-clamp-2 max-w-[200px]">{book.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant">{book.author}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-bold uppercase tracking-wider">
                        {book.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-on-background">${book.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={book.stock > 0 ? "text-success font-medium" : "text-error font-medium"}>
                        {book.stock}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-on-surface-variant hover:text-primary bg-surface border border-outline-variant rounded-md transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(book._id)}
                          disabled={deleteMutation.isPending}
                          className="p-2 text-on-surface-variant hover:text-error bg-surface border border-outline-variant rounded-md transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
