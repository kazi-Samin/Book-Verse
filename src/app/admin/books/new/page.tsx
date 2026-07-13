"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateBook } from "@/hooks/useBooks";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock cannot be negative"),
  isbn: z.string().optional(),
  description: z.string().min(10, "Description is too short"),
  coverImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type BookForm = z.infer<typeof bookSchema>;

export default function AddBookPage() {
  const router = useRouter();
  const createMutation = useCreateBook();
  const [errorMsg, setErrorMsg] = useState("");
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (!session || (session.user.email !== "kazisamin0173@gmail.com" && session.user.role !== "admin")) {
        router.replace("/");
      }
    }
  }, [session, isPending, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<BookForm>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      price: 0,
      stock: 0,
    }
  });

  const onSubmit = async (data: BookForm) => {
    try {
      setErrorMsg("");
      await createMutation.mutateAsync(data);
      router.push("/admin/books");
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || "Failed to create book");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-margin-desktop py-12">
      <Link href="/admin/books" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-8 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Manage Books
      </Link>

      <div className="mb-8">
        <h1 className="font-section-title text-4xl font-bold text-on-background mb-2">Add New Book</h1>
        <p className="font-body-main text-on-surface-variant">Enter the details to add a new book to the library.</p>
      </div>

      {errorMsg && (
        <div className="bg-error-container text-on-error-container p-4 rounded-lg mb-6 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <div className="bg-surface rounded-xl p-8 border border-outline-variant whisper-shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-2">Title *</label>
              <input {...register("title")} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors" />
              {errors.title && <p className="text-error text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-2">Author *</label>
              <input {...register("author")} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors" />
              {errors.author && <p className="text-error text-sm mt-1">{errors.author.message}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-2">Category *</label>
              <select {...register("category")} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors appearance-none">
                <option value="">Select a category</option>
                <option value="Fiction">Fiction</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Psychology">Psychology</option>
                <option value="History">History</option>
                <option value="Mystery">Mystery</option>
              </select>
              {errors.category && <p className="text-error text-sm mt-1">{errors.category.message}</p>}
            </div>
            <div>
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-2">ISBN</label>
              <input {...register("isbn")} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-2">Price ($) *</label>
              <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors" />
              {errors.price && <p className="text-error text-sm mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-2">Stock *</label>
              <input type="number" {...register("stock", { valueAsNumber: true })} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors" />
              {errors.stock && <p className="text-error text-sm mt-1">{errors.stock.message}</p>}
            </div>
          </div>

          <div>
            <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-2">Cover Image URL</label>
            <input {...register("coverImage")} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors" placeholder="https://..." />
            {errors.coverImage && <p className="text-error text-sm mt-1">{errors.coverImage.message}</p>}
          </div>

          <div>
            <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-2">Description *</label>
            <textarea rows={5} {...register("description")} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
            {errors.description && <p className="text-error text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-outline-variant">
            <button type="button" onClick={() => router.back()} className="px-6 py-3 border border-outline-variant text-on-background rounded-lg font-bold hover:bg-surface-container-low transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={createMutation.isPending} className="px-8 py-3 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-opacity active:scale-95 disabled:opacity-50 flex items-center gap-2">
              {createMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
