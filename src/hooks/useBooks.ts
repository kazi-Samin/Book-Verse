import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export function useCreateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newBook: Partial<IBook>) => {
      const { data } = await axiosInstance.post<ApiResponse<IBook>>("/books", newBook);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<IBook> }) => {
      const { data: resData } = await axiosInstance.patch<ApiResponse<IBook>>(`/books/${id}`, data);
      return resData;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["books", variables.id] });
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<ApiResponse<null>>(`/books/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
