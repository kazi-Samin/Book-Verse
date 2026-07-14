import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { ApiResponse } from "../types";

interface DashboardStats {
  totalBooks: number;
  totalUsers: number;
  totalOrders: number;
}

interface MonthlyStats {
  sales: number[];
  months: string[];
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<DashboardStats>>("/dashboard/stats");
      return data;
    },
  });
}

export function useMonthlyStats() {
  return useQuery({
    queryKey: ["dashboard", "monthly"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<MonthlyStats>>("/dashboard/monthly");
      return data;
    },
  });
}
