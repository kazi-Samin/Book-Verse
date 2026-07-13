import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { ApiResponse, IBook } from "../types";

export interface BookFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: "price_asc" | "price_desc" | "rating_desc" | "newest";
  page?: number;
  limit?: number;
}

export function useBooks(filters?: BookFilters) {
  return useQuery({
    queryKey: ["books", filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<IBook[]>>("/books", {
        params: filters,
      });
      return data;
    },
  });
}

export function useBook(id: string) {
  return useQuery({
    queryKey: ["books", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<IBook>>(`/books/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
